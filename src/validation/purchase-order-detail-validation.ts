import { z, ZodType } from "zod";

const PurchaseOrderSchema = z.object({
    po_number: z.string().nullable(),
    pr_number: z.string().nullable().optional(),
    pr_requested: z.string().nullable().optional(),
    kanban_code: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    specification: z.string().nullable().optional(),
    quantity: z.coerce.number().int().nullable().optional(),
    unit: z.string().nullable().optional(),
    status: z.string().nullable().optional(),
    remark: z.string().nullable().optional(),

});



export class PurchaseOrderDetailValidation {


    static readonly CREATE: ZodType = z.array(PurchaseOrderSchema);

    static readonly SEARCH: ZodType = z.object({
        keyword: z.string().optional(),
        page: z.number().min(1).positive().optional(),
        limit: z.number().min(1).max(100).positive().optional(),
        paginate: z.boolean().optional()
    })
}
