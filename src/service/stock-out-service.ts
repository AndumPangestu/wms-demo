import { StockOutResponse, CreateStockOutRequest, toStockOutResponse, SearchStockOutRequest, UpdateStockOutRequest } from "../model/stock-out-model";
import { Validation } from "../validation/validation";
import { StockOutValidation } from "../validation/stock-out-validation";
import { StockOut } from "@prisma/client";
import { prismaClient } from "../application/database";
import { logger } from "../application/logging";
import { ResponseError } from "../error/response-error";
import { Pageable } from "../model/page";
import { Workbook } from "exceljs"
import path from 'path';
import { convertToReadableDate } from "../helper/readable-date-helper";
import { sendNotification } from "../application/websocket";



export class StockOutService {

    static async create(request: CreateStockOutRequest): Promise<StockOutResponse> {
        const createRequest = Validation.validate(StockOutValidation.CREATE, request);
        return await prismaClient.$transaction(async (prisma) => {


            const isOperatorExist = await prisma.user.findFirst({
                where: {
                    id: createRequest.operator_id
                }
            });

            if (!isOperatorExist) {
                throw new ResponseError(404, "Operator not found");
            }

            const kanbanRows = await prisma.$queryRaw<
                Array<{ id: string, balance: number }>
            >`SELECT id, balance FROM kanbans WHERE code = ${createRequest.kanban_code} FOR UPDATE`;

            if (kanbanRows.length === 0) {
                throw new ResponseError(404, "Kanban Code not found");
            }

            const kanban = kanbanRows[0];

            if (kanban.balance < createRequest.quantity) {
                throw new ResponseError(400, "Kanban stock is not enough");
            }

            // Update kanban balance
            const newKanban = await prisma.kanban.update({
                where: { id: Number(kanban.id) },
                data: {
                    balance: { decrement: createRequest.quantity }
                }
            });

            // Create stock out record
            const stockOut = await prisma.stockOut.create({
                data: {
                    ...createRequest,
                    original_quantity: createRequest.quantity,
                    operator_id: createRequest.operator_id,
                    balance_before: kanban.balance,
                    balance_after: kanban.balance - createRequest.quantity
                },
                include: {
                    machine_area: true,
                    machine: true,
                    operator: true,
                    kanban: true
                }

            });


            if (newKanban.min_quantity && newKanban.balance < newKanban.min_quantity) {
                logger.info(`Kanban ${newKanban.code} stock is less than ${newKanban.min_quantity} ${newKanban.uom}`);
                sendNotification(`Kanban ${newKanban.code} stock is less than ${newKanban.min_quantity} ${newKanban.uom}`);
            }


            return toStockOutResponse(stockOut);
        });
    }

    static async update(id: number, request: UpdateStockOutRequest): Promise<StockOutResponse> {
        const updateRequest = Validation.validate(StockOutValidation.UPDATE, request);

        if (isNaN(id)) {
            throw new ResponseError(400, "Invalid id");
        }

        return await prismaClient.$transaction(async (tx) => {
            const existingStockOut = await tx.stockOut.findUnique({
                where: { id }
            });

            if (!existingStockOut) {
                throw new ResponseError(404, "Stock Out not found");
            }

            if (!existingStockOut.kanban_code) {
                throw new ResponseError(400, "Kanban code not found. Cannot update stock out.");
            }

            const existingQuantity = existingStockOut.quantity;


            const updatedStockOut = await tx.stockOut.update({
                where: { id },
                data: { ...updateRequest },
                include: {
                    machine_area: true,
                    machine: true,
                    operator: true,
                    kanban: true
                }
            });

            // Jika quantity berubah, update juga kanban.balance
            if (existingQuantity !== updateRequest.quantity) {


                const kanban = await tx.kanban.findUnique({
                    where: { code: existingStockOut.kanban_code }
                });

                if (!kanban) {
                    throw new ResponseError(404, "Kanban not found");
                }

                const quantityDiff = updateRequest.quantity - existingQuantity;

                if (quantityDiff > 0 && kanban.balance < quantityDiff) {
                    throw new ResponseError(400, "Kanban stock is not enough");
                }

                if (quantityDiff !== 0) {
                    await tx.kanban.update({
                        where: { code: existingStockOut.kanban_code },
                        data: {
                            balance: {
                                increment: -quantityDiff
                            }
                        }
                    });
                }

            }

            return toStockOutResponse(updatedStockOut);
        });
    }




    static async get(request: SearchStockOutRequest): Promise<Pageable<StockOutResponse>> {


        const searchRequest = Validation.validate(StockOutValidation.SEARCH, request);

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

        if (searchRequest.machine_area_id) {
            filters.push({
                machine_area_id: searchRequest.machine_area_id,
            });
        }

        if (searchRequest.machine_id) {
            filters.push({
                machine_id: searchRequest.machine_id,
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

        // Default pagination values if not provided
        const page = searchRequest.page || 1;
        const limit = searchRequest.limit || 10;

        const skip = (page - 1) * limit;

        const [stockOuts, total] = await Promise.all([
            prismaClient.stockOut.findMany({
                where: whereClause,
                orderBy: {
                    created_at: 'desc'
                },
                ...(searchRequest.paginate ? { take: limit, skip } : {}),
                include: {
                    machine_area: true,
                    machine: true,
                    operator: true,
                    kanban: true

                }
            }),
            prismaClient.stockOut.count({
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
            data: stockOuts.map(toStockOutResponse),
            ...(pagination ? { pagination } : {})

        };
    }

    static async show(id: number): Promise<StockOutResponse> {

        if (isNaN(id)) {
            throw new ResponseError(400, "Invalid id");
        }

        const stockOut = await prismaClient.stockOut.findUnique({
            where: {
                id: id
            },
            include: {
                machine_area: true,
                machine: true,
                operator: true,
                kanban: true
            }
        });

        if (!stockOut) {
            throw new ResponseError(404, "StockOut not found");
        }

        return toStockOutResponse(stockOut);
    }


    static async exportExcel(request: SearchStockOutRequest): Promise<any> {
        const searchRequest = Validation.validate(StockOutValidation.SEARCH, request);

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

        if (searchRequest.machine_area_id) {
            filters.push({
                machine_area_id: searchRequest.machine_area_id,
            });
        }

        if (searchRequest.machine_id) {
            filters.push({
                machine_id: searchRequest.machine_id,
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

        const stockOuts = await prismaClient.stockOut.findMany({
            where: whereClause,
            include: {
                machine_area: true,
                machine: true,
                operator: true

            }
        })

        const workbook = new Workbook()
        const templatePath = path.resolve(__dirname, "../../template_file/StockOutExportTemplate.xlsx")

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

        for (const stock of stockOuts) {
            const row = worksheet.getRow(rowIndex++);

            row.getCell(1).value = number++;
            row.getCell(2).value = 75;
            row.getCell(3).value = stock.kanban_code ?? "-";
            row.getCell(4).value = stock.operator?.name ?? "-";
            row.getCell(5).value = stock.machine_area?.name ?? "-";
            row.getCell(6).value = stock.machine?.code ?? "-";
            row.getCell(7).value = stock.quantity;

            // Human-readable date format
            row.getCell(8).value = convertToReadableDate(stock.created_at.toString());
            row.commit();
        }

        const buffer = await workbook.xlsx.writeBuffer();
        return buffer;


    }

}


