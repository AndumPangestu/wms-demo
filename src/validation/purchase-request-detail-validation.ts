import { z, ZodType } from "zod";

const PurchaseRequestDetailSchema = z.object({
    pr_number: z.string().nullable().optional(),
    acc: z.string().nullable().optional(),
    kanban_code: z.string().nullable().optional(),
    item_name: z.string().nullable().optional(),
    description_of_goods: z.string().nullable().optional(),
    specification: z.string().nullable().optional(),
    part: z.string().nullable().optional(),
    quantity: z.coerce.number().int().nullable().optional(),
    unit: z.string().nullable().optional(),
    est_unit_price: z.coerce.number().nullable().optional(),
    est_amount: z.coerce.number().nullable().optional(),
    currency: z.string().nullable().optional(),
    req_delivery: z.coerce.date().nullable().optional(),
    supplier: z.string().nullable().optional(),
    remark: z.string().nullable().optional(),
    purpose: z.string().nullable().optional(),
});



export class PurchaseRequestDetailValidation {


    static readonly CREATE: ZodType = z.array(PurchaseRequestDetailSchema);

    static readonly SEARCH: ZodType = z.object({
        keyword: z.string().optional(),
        page: z.number().min(1).positive().optional(),
        limit: z.number().min(1).max(100).positive().optional(),
        paginate: z.boolean().optional()
    })
}
