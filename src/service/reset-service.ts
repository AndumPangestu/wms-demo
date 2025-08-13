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
      await prismaClient.$executeRawUnsafe(`TRUNCATE TABLE processed_files`),
      await prismaClient.$executeRawUnsafe(`TRUNCATE TABLE purchase_orders`),
      await prismaClient.$executeRawUnsafe(`TRUNCATE TABLE purchase_requests`),
      await prismaClient.$executeRawUnsafe(`TRUNCATE TABLE receiving_reports`),
      await prismaClient.$executeRawUnsafe(`TRUNCATE TABLE stock_ins`),
      await prismaClient.$executeRawUnsafe(`TRUNCATE TABLE stock_outs`),
      await prismaClient.$executeRawUnsafe(`TRUNCATE TABLE work_orders`),
      await prismaClient.$executeRawUnsafe(
        `TRUNCATE TABLE work_order_products`
      ),
    ]);

    return true;
  }
}
