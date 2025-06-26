import { z, ZodType } from "zod";

export class WorkOrderValidation {

    static readonly CREATE: ZodType = z.object({
        work_order_products: z.array(z.object({ product_id: z.number(), quantity: z.number() }))
    });

    static readonly UPDATE: ZodType = z.object({
        work_order_products: z.array(z.object({ product_id: z.number(), quantity: z.number() }))
    });

    static readonly SEARCH: ZodType = z.object({
        keyword: z.string().optional(),
        page: z.number().min(1).positive().optional(),
        limit: z.number().min(1).max(100).positive().optional(),
        paginate: z.boolean().optional()
    })
}
