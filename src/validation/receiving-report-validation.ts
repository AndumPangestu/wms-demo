import { z, ZodType } from "zod";


const ReceivingReportSchema = z.object({
    kanban_code: z.string().min(1).max(100),
    received_quantity: z.number().min(1).positive(),
});


export class ReceivingReportValidation {

    static readonly CREATE: ZodType = z.array(ReceivingReportSchema);
    static readonly SEARCH: ZodType = z.object({
        keyword: z.string().optional(),
        page: z.number().min(1).positive().optional(),
        limit: z.number().min(1).max(100).positive().optional(),
        paginate: z.boolean().optional(),
        start_date: z.coerce.date().nullable().optional(),
        end_date: z.coerce.date().nullable().optional(),
    })
}
