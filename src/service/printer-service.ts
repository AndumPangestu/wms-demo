import { ResponseError } from "../error/response-error";
import { logger } from "../application/logging";
import axios from 'axios';

export class PrinterService {

    static async print(name: string, workOrderCode: string) {

        if (!name) {
            logger.error("🔴 Invalid name");
            return;
        }

        if (!workOrderCode) {
            logger.error("🔴 Invalid work order code")
            return;
        }

        try {
            await axios.post('http://192.168.245.224:5050/api/Print/PrintLabel', {
                pickerName: name,
                workOrder: workOrderCode
            });
            logger.info(`🟢 Print with name: ${name} and work order code: ${workOrderCode}`);
        } catch (error) {
            logger.error("🔴 Print with name: " + name + " and work order code: " + workOrderCode + " error " + error);
        }
    }



}