import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

export class ResetService {
  static async reset() {
    await Promise.all([
      prismaClient.kanban.updateMany({
        data: {
          balance: 0,
          stock_in_quantity: 0,
          incoming_order_stock: 0,
        },
      }),
      prismaClient.receivingReport.deleteMany(),
      prismaClient.processedFile.deleteMany(),
      prismaClient.purchaseOrder.deleteMany(),
      prismaClient.purchaseRequest.deleteMany(),
      prismaClient.stockIn.deleteMany(),
      prismaClient.stockOut.deleteMany(),
      prismaClient.workOrder.deleteMany(),
    ]);

    return true;
  }
}
