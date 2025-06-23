import xlsx from 'xlsx';
import { CreateReceivingReportRequest, ReceivingReportRawEntry } from "../model/receiving-report-model";
import { Validation } from "../validation/validation";
import { ReceivingReportValidation } from "../validation/receiving-report-validation";
import { prismaClient } from "../application/database";
import { logger } from "../application/logging";


export class ReceivingReportService {

    static async create(filePath: string) {

        const workbook: xlsx.WorkBook = xlsx.readFile(filePath);

        const sheet: xlsx.WorkSheet = workbook.Sheets["Sheet1"];

        const data: any[][] = xlsx.utils.sheet_to_json(sheet, {
            header: 1,
        });


        const headers: string[] = data[6] as string[];

        const importantHeaders: string[] = [
            "Product Code",
            "Received",
        ];


        const missingHeaders: string[] = importantHeaders.filter((h) => !headers.includes(h));
        if (missingHeaders.length > 0) {
            logger.error(`Missing important headers: ${missingHeaders.join(", ")}`);
            throw new Error(`Missing important headers: ${missingHeaders.join(", ")}`);
        }

        const receivingReports: ReceivingReportRawEntry[] = [];



        for (let i = 7; i < data.length - 1; i++) {
            if (data[i].length === 0) continue;

            const receivingReportTemp: ReceivingReportRawEntry = {};

            for (let j = 0; j < headers.length; j++) {
                receivingReportTemp[headers[j]] = data[i][j];
            }

            const isDescriptionOnly: boolean =
                data[i].filter(Boolean).length === 1 && Boolean(receivingReportTemp["Description"]);

            if (isDescriptionOnly && receivingReports.length > 0) {
                receivingReports[receivingReports.length - 1]["Description"] += ` ${receivingReportTemp["Description"]}`;
                continue;
            }

            receivingReports.push(receivingReportTemp);
        }

        const parseNumber = (val: string): number =>
            Number(val);

        const parseString = (val: string): string =>
            val.toString()

        const isValidProductCode = (code: string): boolean => {
            const prefix = code.split("-")[0];
            return prefix === "EA";
        };



        const purrchaseOrderFormattedResult: CreateReceivingReportRequest[] = receivingReports
            .filter((entry: ReceivingReportRawEntry) => entry["Product Code"] !== undefined && entry.Received !== undefined && isValidProductCode(entry["Product Code"]))
            .map((entry: ReceivingReportRawEntry) => ({
                kanban_code: parseString(entry["Product Code"]),
                received_quantity: parseNumber(entry.Received),
            }));


        try {
            const createRequest = Validation.validate(
                ReceivingReportValidation.CREATE,
                purrchaseOrderFormattedResult
            );


            const kanbanCodes = createRequest.map((item: any) => item.kanban_code);
            const existingKanbans = await prismaClient.kanban.findMany({
                where: { code: { in: kanbanCodes } },
                select: { code: true },
            });

            const existingCodesSet = new Set(existingKanbans.map(k => k.code));


            const validRequests = createRequest.filter((item: any) => {
                const exists = existingCodesSet.has(item.kanban_code);
                if (!exists) {
                    logger.warn(`Kanban code not found: ${item.kanban_code}`);
                }
                return exists;
            });

            if (validRequests.length === 0) {
                logger.warn("No valid kanban codes found. Aborting insert.");
                throw new Error("No valid kanban codes found. Aborting insert.");
            }


            const transactionQueries = [];


            transactionQueries.push(
                prismaClient.receivingReport.createMany({ data: validRequests })
            );


            for (const item of validRequests) {
                transactionQueries.push(
                    prismaClient.kanban.updateMany({
                        where: { code: item.kanban_code },
                        data: {
                            stock_in_quantity: item.received_quantity,
                        },
                    })
                );
            }

            await prismaClient.$transaction(transactionQueries);

            logger.info("Receiving report(s) created and stock_in_quantity updated successfully");
            return true;
        } catch (error) {
            logger.error(`Error while creating receiving report and updating kanban: ${error}`);
            throw new Error(`Error while creating receiving report and updating kanban: ${error}`);
        }

    }
}


