import { z, ZodType } from "zod";

const PurchaseRequestSchema = z.object({
    date: z.coerce.date().nullable().optional(),
    pr_number: z.string().nullable().optional(),
    department: z.string().nullable().optional(),
    budget_number: z.string().nullable().optional(),
    fixed_asset_number: z.string().nullable().optional(),
    type: z.string().nullable().optional(),
    transportation: z.string().nullable().optional(),
    kind_of_request: z.string().nullable().optional(),
    requested: z.string().nullable().optional(),
    gen_manager: z.string().nullable().optional(),
    supervisor: z.string().nullable().optional(),
});



export class PurchaseRequestValidation {


    static readonly CREATE: ZodType = z.array(PurchaseRequestSchema);

    static readonly SEARCH: ZodType = z.object({
        keyword: z.string().optional(),
        page: z.number().min(1).positive().optional(),
        limit: z.number().min(1).max(100).positive().optional(),
        paginate: z.boolean().optional(),
        start_date: z.coerce.date().nullable().optional(),
        end_date: z.coerce.date().nullable().optional(),
    })
}
