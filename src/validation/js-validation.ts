import { z, ZodType } from "zod";


const JsSchema = z.object({
    code: z.string().min(1).max(100),
    js_ending_quantity: z.number().min(0).positive(),
});


export class JsValidation {

    static readonly CREATE: ZodType = z.array(JsSchema);
    static readonly SEARCH: ZodType = z.object({
        keyword: z.string().optional(),
        page: z.number().min(1).positive().optional(),
        limit: z.number().min(1).max(100).positive().optional(),
        paginate: z.boolean().optional(),
        start_date: z.coerce.date().nullable().optional(),
        end_date: z.coerce.date().nullable().optional(),
    })
}
