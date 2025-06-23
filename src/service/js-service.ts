import xlsx from 'xlsx';
import { CreateJsRequest } from "../model/js-model";
import { Validation } from "../validation/validation";
import { JsValidation } from "../validation/js-validation";
import { prismaClient } from "../application/database";
import { logger } from "../application/logging";


export class JsService {

    static async create(filePath: string) {

        const workbook: xlsx.WorkBook = xlsx.readFile(filePath);

        const sheet: xlsx.WorkSheet = workbook.Sheets["Sheet1"];

        const data: any[][] = xlsx.utils.sheet_to_json(sheet, {
            header: 1,
        });


        const headers: string[] = (data[3] as string[]).concat(data[4] as string[]);



        const importantHeaders: string[] = [
            "Code",
            "Ending",
        ];


        const missingHeaders: string[] = importantHeaders.filter((h) => !headers.includes(h));
        if (missingHeaders.length > 0) {
            logger.error(`Missing important headers: ${missingHeaders.join(", ")}`);
            throw new Error(`Missing important headers: ${missingHeaders.join(", ")}`);
        }

        const isValidProductCode = (code: string): boolean => {
            const prefix = code.split("-")[0];
            return prefix === "EA";
        };

        const jss: CreateJsRequest[] = [];

        for (let i = 5; i < data.length - 1; i++) {
            if (data[i].length === 0) continue;


            if (data[i][1] === null || data[i][7] === null || data[i][1] === undefined || data[i][7] === undefined) {
                logger.error(`Missing important data in row ${i + 1}: ${data[i]}`);
                continue;
            };

            if (!isValidProductCode(data[i][1])) {
                continue;
            };

            if (Number(data[i][7]) === 0 || data[i][7] === undefined || data[i][7] === null) {
                continue;
            };

            jss.push({
                code: data[i][1],
                js_ending_quantity: Number(data[i][7]) || 0,
            });
        }


        try {
            const createRequest = Validation.validate(JsValidation.CREATE, jss);
            const codes = createRequest.map(js => js.code);

            const existingKanbans = await prismaClient.kanban.findMany({
                where: { code: { in: codes } },
                select: { code: true },
            });

            const existingCodes = new Set(existingKanbans.map(k => k.code));

            const [validRequest, missingCodes] = createRequest.reduce<[typeof createRequest, string[]]>(
                ([valid, missing], js) => {
                    existingCodes.has(js.code)
                        ? valid.push(js)
                        : missing.push(js.code);
                    return [valid, missing];
                },
                [[], []]
            );

            if (missingCodes.length > 0) {
                logger.warn(`Kanban(s) not found: ${missingCodes.join(", ")}`);
            }


            if (validRequest.length > 0) {
                await Promise.all(
                    validRequest.map(js =>
                        prismaClient.kanban.update({
                            where: { code: js.code },
                            data: { js_ending_quantity: js.js_ending_quantity }
                        })
                    )
                );
                logger.info("Kanban(s) updated successfully");
            } else {
                logger.warn("No valid kanban(s) to update");
                throw new Error("No valid kanban(s) to update");
            }

            return true;
        } catch (error) {
            logger.error(`Error updating kanban(s): ${error}`);
            throw new Error(`Error updating kanban(s): ${error}`);
        }


    }
}


