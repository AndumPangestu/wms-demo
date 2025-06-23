import xlsx from 'xlsx';
import { Validation } from '../validation/validation';
import { PurchaseRequestValidation } from '../validation/purchase-request-validation';
import { PurchaseRequestDetailValidation } from '../validation/purchase-request-detail-validation';
import { prismaClient } from "../application/database";
import { CreatePurchaseRequestRequest, PurchaseRequestResponse, PurchaseRequestRawEntry, SearchPurchaseRequestRequest, toPurchaseRequestResponse } from "../model/purchase-request-model";
import { PurchaseRequestDetailRawEntry, CreatePurchaseRequestDetailRequest } from "../model/purchase-request-detail-model";
import { logger } from '../application/logging';
import { convertDate } from '../helper/convert-date-helper';
import { ResponseError } from "../error/response-error";
import { Pageable } from "../model/page";
import { log } from 'console';

export class PurchaseRequestService {
    static async create(filePath: string) {



        const workbook: xlsx.WorkBook = xlsx.readFile(filePath);

        // Ambil sheet (pastikan nama sheet sesuai)
        const sheet: xlsx.WorkSheet = workbook.Sheets["Sheet1"];

        // Konversi sheet ke JSON
        const data: any[][] = xlsx.utils.sheet_to_json(sheet, {
            header: 1,
        });


        const headers: string[] = data[4] as string[];


        const importantHeaders: string[] = [
            "Date",
            "PR No.",
            "Department",
            "Budget No.",
            "Fixed Asset No",
            "Type",
            "Transportation",
            "Kind of Request",
            "Requested",
            "Gen. Manager",
            "Supervisor",

        ];


        const missingHeaders: string[] = importantHeaders.filter((h) => !headers.includes(h));
        if (missingHeaders.length > 0) {
            logger.error(`Missing important headers in file ${filePath}: ${missingHeaders.join(", ")}`);
            throw new Error(`Missing important headers in file ${filePath}: ${missingHeaders.join(", ")}`);
        }

        const isValidProductCode = (code: string): boolean => {
            const prefix = code.split("-")[0];
            return prefix === "EA";
        };




        const purchaseRequests: PurchaseRequestRawEntry[] = [];
        const purchaseRequestDetails: PurchaseRequestDetailRawEntry[] = [];

        for (let i = 5; i < data.length - 1; i++) {
            if (data[i].length === 0) continue;



            const obj: PurchaseRequestRawEntry = {};
            const objDetail: PurchaseRequestDetailRawEntry = {};
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = data[i][j];
                objDetail[headers[j]] = data[i][j];
            }

            const isPurposeOnly: boolean =
                data[i].filter(Boolean).length === 1 && Boolean(objDetail["Purpose"]);

            if (isPurposeOnly && purchaseRequestDetails.length > 0) {
                purchaseRequestDetails[purchaseRequestDetails.length - 1]["Purpose"] += ` ${objDetail["Purpose"]}`;
                continue;
            }

            const isContinuationRow: boolean = importantHeaders.every((header) => !obj[header]);

            if (isContinuationRow && purchaseRequests.length > 0) {
                objDetail["PR No."] = purchaseRequests[purchaseRequests.length - 1]["PR No."];
            } else {
                objDetail["PR No."] = obj["PR No."];
                purchaseRequests.push(obj);
            }


            purchaseRequestDetails.push(objDetail);
        }

        const parseNumber = (val: string | undefined): number | null =>
            val && val !== "-" ? Number(val) : null;

        const parseString = (val: string | undefined): string | null =>
            val && val !== "-" ? val.toString() : null;

        const parseDate = (val: string | undefined): Date | null =>
            val && val !== "-" ? convertDate(val) : null;

        const formattedResult: CreatePurchaseRequestRequest[] = purchaseRequests.map((entry: PurchaseRequestRawEntry) => {

            return {
                date: parseDate(entry["Date"]),
                pr_number: parseString(entry["PR No."]),
                department: parseString(entry.Department),
                budget_number: parseString(entry["Budget No."]),
                fixed_asset_number: parseString(entry["Fixed Asset No"]),
                type: parseString(entry.Type),
                transportation: parseString(entry.Transportation),
                kind_of_request: parseString(entry["Kind of Request"]),
                requested: parseString(entry.Requested),
                gen_manager: parseString(entry["Gen. Manager"]),
                supervisor: parseString(entry.Supervisor),
            };
        });

        const detailFormattedResult: CreatePurchaseRequestDetailRequest[] = purchaseRequestDetails.map((entry: PurchaseRequestRawEntry) => {

            return {
                pr_number: parseString(entry["PR No."]),
                acc: parseString(entry.Acc),
                kanban_code: parseString(entry["Item Code"]),
                item_name: parseString(entry["Item Name"]),
                description_of_goods: parseString(entry["Description of Goods"]),
                specification: parseString(entry.Specification),
                part: parseString(entry.Part),
                quantity: parseNumber(entry.Quantity),
                unit: parseString(entry.Unit),
                est_unit_price: parseNumber(entry["Est. Unit Price"]),
                est_amount: parseNumber(entry["Est. Amount"]),
                currency: parseString(entry.Currency),
                req_delivery: parseDate(entry["Req. Delivery"]),
                supplier: parseString(entry.Supplier),
                remark: parseString(entry.Remark),
                purpose: parseString(entry.Purpose),
            };
        });

        try {
            // Validasi data
            let createRequest = Validation.validate(PurchaseRequestValidation.CREATE, formattedResult)
                .filter(item => item.pr_number?.startsWith("75"));

            let createRequestDetail = Validation.validate(PurchaseRequestDetailValidation.CREATE, detailFormattedResult)
                .filter(item =>
                    item.pr_number?.startsWith("75") &&
                    (item.kanban_code === null || isValidProductCode(item.kanban_code))
                );



            const kanbanCodes = createRequestDetail
                .map(item => item.kanban_code)
                .filter((code): code is string => Boolean(code));

            // Cari kanban code yang sudah ada di DB
            const existingKanban = await prismaClient.kanban.findMany({
                where: { code: { in: kanbanCodes } },
                select: { code: true }
            });

            const existingKanbanCodes = new Set(existingKanban.map(k => k.code));

            // Deteksi dan buat kanban yang tidak ada
            const missingKanban = createRequestDetail.filter(
                item => item.kanban_code && !existingKanbanCodes.has(item.kanban_code)
            );



            if (missingKanban.length > 0) {

                const newKanbans = missingKanban.map(item => ({
                    code: item.kanban_code!,
                    description: item.description_of_goods!,
                    specification: item.specification!,
                    uom: item.unit!,
                    price: item.est_unit_price!,
                    currency: item.currency!,
                }));

                await prismaClient.$transaction(async (tx) => {
                    await tx.kanban.createMany({ data: newKanbans, skipDuplicates: true });
                });

                logger.info(`Created kanban codes from ${filePath}: ${missingKanban.map(i => i.kanban_code).join(", ")}`);
            }

            if (createRequestDetail.length === 0) {
                const msg = `All kanban codes in file ${filePath} do not exist in database`;
                logger.error(msg);
                throw new Error(msg);
            }

            // Cek apakah PR number sudah ada
            const prNumbers = createRequest.map(item => item.pr_number).filter(Boolean) as string[];

            const existing = await prismaClient.purchaseRequest.findMany({
                where: { pr_number: { in: prNumbers } },
                select: { pr_number: true }
            });

            const existingNumbers = new Set(existing.map(e => e.pr_number));

            // Filter yang belum ada
            const filteredRequest = createRequest.filter(item => !existingNumbers.has(item.pr_number));
            createRequestDetail = createRequestDetail.filter(item => !existingNumbers.has(item.pr_number));

            if (filteredRequest.length === 0) {
                logger.error(`All PR numbers in file ${filePath} already exist in database`);
            } else if (filteredRequest.length !== createRequest.length) {
                logger.warn(`Some PR numbers in file ${filePath} already exist in database`);
                existingNumbers.forEach(pr => logger.warn(`PR Number ${pr} already exists in database`));
            }

            // Simpan ke database
            await prismaClient.$transaction([
                prismaClient.purchaseRequest.createMany({ data: filteredRequest }),
                prismaClient.purchaseRequestDetail.createMany({ data: createRequestDetail })
            ]);

            logger.info("Purchase request and details created successfully");
            return true;

        } catch (error) {
            logger.error(`Error while creating purchase request and details: ${error}`);
            throw new Error(`Error while creating purchase request and details: ${error}`);
        }

    }


    static async get(request: SearchPurchaseRequestRequest): Promise<Pageable<PurchaseRequestResponse>> {
        const searchRequest = Validation.validate(PurchaseRequestValidation.SEARCH, request);

        const filters: any[] = [];

        if (searchRequest.keyword) {
            filters.push({
                OR: [
                    { pr_number: { contains: searchRequest.keyword } },
                ]
            });
        }

        if (searchRequest.start_date) {
            filters.push({
                date: {
                    gte: searchRequest.start_date
                }
            })
        }


        if (searchRequest.end_date) {
            filters.push({
                date: {
                    lte: searchRequest.end_date
                }
            })
        }

        const whereClause = filters.length > 0 ? { AND: filters } : {};

        // Default pagination values if not provided
        const page = searchRequest.page || 1;
        const limit = searchRequest.limit || 10;

        const skip = (page - 1) * limit;

        const [purchaseRequests, total] = await Promise.all([
            prismaClient.purchaseRequest.findMany({
                where: whereClause,
                orderBy: {
                    created_at: 'desc'
                },
                ...(searchRequest.paginate ? { take: limit, skip } : {}),

            }),
            prismaClient.purchaseRequest.count({
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
            data: purchaseRequests.map(toPurchaseRequestResponse),
            ...(pagination ? { pagination } : {})

        };
    }


    static async show(id: number): Promise<PurchaseRequestResponse> {

        if (isNaN(id)) {
            throw new ResponseError(400, "Invalid id");
        }

        const PurchaseRequest = await prismaClient.purchaseRequest.findUnique({
            where: {
                id: id
            },
            include: {
                purchase_request_detail: true
            }

        });

        if (!PurchaseRequest) {
            throw new ResponseError(404, "PurchaseRequest not found");
        }

        return toPurchaseRequestResponse(PurchaseRequest);
    }
}