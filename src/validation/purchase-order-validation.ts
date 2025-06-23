import { z, ZodType } from "zod";

const PurchaseOrderSchema = z.object({

    department: z.string().nullable().optional(),
    supplier_id: z.number().nullable().optional(),
    po_number: z.string().nullable(),
    po_date: z.coerce.date().nullable().optional(),
    pr_date: z.coerce.date().nullable().optional(),


});



export class PurchaseOrderValidation {


    static readonly CREATE: ZodType = z.array(PurchaseOrderSchema);

    static readonly SEARCH: ZodType = z.object({
        keyword: z.string().optional(),
        page: z.number().min(1).positive().optional(),
        limit: z.number().min(1).max(100).positive().optional(),
        paginate: z.boolean().optional(),
        start_date: z.coerce.date().nullable().optional(),
        end_date: z.coerce.date().nullable().optional(),
    })
}
