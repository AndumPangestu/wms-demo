import { StockInResponse, CreateStockInRequest, toStockInResponse, SearchStockInRequest } from "../model/stock-in-model";
import { Validation } from "../validation/validation";
import { StockInValidation } from "../validation/stock-in-validation";
import { StockIn } from "@prisma/client";
import { prismaClient } from "../application/database";
import { logger } from "../application/logging";
import { ResponseError } from "../error/response-error";
import { Pageable } from "../model/page";
import { Workbook } from "exceljs"
import path from 'path';
import { convertToReadableDate } from "../helper/readable-date-helper";


export class StockInService {

    static async create(request: CreateStockInRequest): Promise<StockInResponse> {
        const createRequest = Validation.validate(StockInValidation.CREATE, request);

        return await prismaClient.$transaction(async (prisma) => {

            const isOperatorExist = await prisma.operator.findFirst({
                where: {
                    id: createRequest.operator_id
                }
            });

            if (!isOperatorExist) {
                throw new ResponseError(404, "Operator not found");
            }

            // Lock baris kanban berdasarkan code
            const kanbanRows = await prisma.$queryRaw<
                Array<{ id: string, stock_in_quantity: number, balance: number, incoming_order_stock: number }>
            >`SELECT id, stock_in_quantity, incoming_order_stock, balance FROM kanbans WHERE code = ${createRequest.kanban_code} FOR UPDATE`;

            if (kanbanRows.length === 0) {
                throw new ResponseError(404, "Kanban not found");
            }

            const kanbanData = kanbanRows[0];


            if (kanbanData.stock_in_quantity <= 0) {
                throw new ResponseError(400, "Receiving report file is not uploaded");
            }

            if (kanbanData.incoming_order_stock < kanbanData.stock_in_quantity) {
                throw new ResponseError(400, "stock in quantity less than incoming order stock");
            }

            // Create stock-in
            const stockIn = await prisma.stockIn.create({
                data: {
                    ...createRequest,
                    quantity: kanbanData.stock_in_quantity,
                    operator_id: createRequest.operator_id,
                    balance_before: kanbanData.balance,
                    balance_after: kanbanData.balance + kanbanData.stock_in_quantity
                },
                include: {
                    operator: true,
                    kanban: true
                }
            });

            await prisma.kanban.update({
                where: { id: Number(kanbanData.id) },
                data: {
                    balance: { increment: kanbanData.stock_in_quantity },
                    stock_in_quantity: 0,
                    incoming_order_stock: { decrement: kanbanData.stock_in_quantity }
                }
            });

            return toStockInResponse(stockIn);
        }, { timeout: 60000 }
        );
    }





    static async get(request: SearchStockInRequest): Promise<Pageable<StockInResponse>> {


        const searchRequest = Validation.validate(StockInValidation.SEARCH, request);

        const filters: any[] = [];

        if (searchRequest.keyword) {
            const keyword = searchRequest.keyword.replace(/\\/g, '\\\\');
            filters.push({
                OR: [
                    {
                        kanban_code: {
                            contains: keyword
                        }
                    },
                    {
                        kanban: {
                            specification: {
                                contains: keyword
                            }
                        }
                    },
                    {
                        kanban: {
                            description: {
                                contains: keyword
                            }
                        }
                    },
                ]
            });
        }

        if (searchRequest.start_date) {
            filters.push({
                created_at: {
                    gte: searchRequest.start_date
                }
            })
        }



        if (searchRequest.end_date) {
            const endDate = new Date(searchRequest.end_date);
            endDate.setHours(23, 59, 59, 999);
            filters.push({
                created_at: {
                    lte: endDate
                }
            });
        }



        const whereClause = filters.length > 0 ? { AND: filters } : {};

        // Default pagination values if not provided
        const page = searchRequest.page || 1;
        const limit = searchRequest.limit || 10;

        const skip = (page - 1) * limit;

        const [stockIns, total] = await Promise.all([
            prismaClient.stockIn.findMany({
                where: whereClause,
                orderBy: {
                    created_at: 'desc'
                },
                ...(searchRequest.paginate ? { take: limit, skip } : {}),
                include: {
                    kanban: true,
                    operator: true
                }
            }),
            prismaClient.stockIn.count({
                where: whereClause,
            })
        ]);



        const pagination = searchRequest.paginate
            ? {
                curr_page: page,
                total_page: Math.ceil(total / limit),
                limit: limit,
                total: total
            }
            : undefined;


        return {
            data: stockIns.map(toStockInResponse),
            ...(pagination ? { pagination } : {})

        };
    }

    static async show(id: number): Promise<StockInResponse> {

        if (isNaN(id)) {
            throw new ResponseError(400, "Invalid id");
        }

        const stockIn = await prismaClient.stockIn.findUnique({
            where: {
                id: id
            },
            include: {
                kanban: true,
                operator: true
            }
        });

        if (!stockIn) {
            throw new ResponseError(404, "StockIn not found");
        }

        return toStockInResponse(stockIn);
    }


    static async exportExcel(request: SearchStockInRequest): Promise<any> {



        const searchRequest = Validation.validate(StockInValidation.SEARCH, request);

        const filters: any[] = [];

        if (searchRequest.keyword) {
            const keyword = searchRequest.keyword.replace(/\\/g, '\\\\');
            filters.push({
                OR: [
                    {
                        kanban_code: {
                            contains: keyword

                        }
                    },
                ]
            });
        }

        if (searchRequest.start_date) {
            filters.push({
                created_at: {
                    gte: searchRequest.start_date
                }
            })
        }


        if (searchRequest.end_date) {
            filters.push({
                created_at: {
                    lte: searchRequest.end_date
                }
            })
        }


        const whereClause = filters.length > 0 ? { AND: filters } : {};

        const stockIns = await prismaClient.stockIn.findMany({
            where: whereClause,
            include: {
                kanban: true,
                operator: true,
            }
        });

        const workbook = new Workbook()
        const templatePath = path.resolve(__dirname, "../../template_file/StockInExportTemplate.xlsx")

        await workbook.xlsx.readFile(templatePath)
        const worksheet = workbook.getWorksheet(1)
        if (!worksheet) throw new Error("Worksheet tidak ditemukan.")


        const startDate = searchRequest.start_date?.toISOString().split("T")[0] ?? "-"
        const endDate = searchRequest.end_date?.toISOString().split("T")[0] ?? "-"

        const row4 = worksheet.getRow(4)
        row4.getCell(1).value = (row4.getCell(1).value as string)?.replace("{{start_date}}", startDate)
        row4.commit()

        const row5 = worksheet.getRow(5)
        row5.getCell(1).value = (row5.getCell(1).value as string)?.replace("{{end_date}}", endDate)
        row5.commit()

        let rowIndex = 8;
        let number = 1;

        for (const stock of stockIns) {
            const row = worksheet.getRow(rowIndex++);

            row.getCell(1).value = number++;
            row.getCell(2).value = 75;
            row.getCell(3).value = stock.kanban_code ?? "-";
            row.getCell(4).value = stock.operator?.name ?? "-";
            row.getCell(5).value = stock.quantity;

            // Human-readable date format
            row.getCell(6).value = convertToReadableDate(stock.created_at.toString());
            row.commit();
        }

        const buffer = await workbook.xlsx.writeBuffer();
        return buffer;

    }
}


