import { ResponseError } from "../error/response-error";
import { logger } from "../application/logging";
import axios from "axios";
import { DEVICE_URL } from "../application/config";

export class PrinterService {
  static async print(name: string, workOrderCode: string) {
    if (!name) {
      logger.error("🔴 Invalid name");
      return;
    }

    if (!workOrderCode) {
      logger.error("🔴 Invalid work order code");
      return;
    }

    try {
      await axios.post(`${DEVICE_URL}/api/Print/PrintLabel`, {
        pickerName: name,
        workOrder: workOrderCode,
      });
      logger.info(
        `🟢 Print with name: ${name} and work order code: ${workOrderCode}`
      );
    } catch (error) {
      logger.error(
        "🔴 Print with name: " +
          name +
          " and work order code: " +
          workOrderCode +
          " error " +
          error
      );
    }
  }
}
