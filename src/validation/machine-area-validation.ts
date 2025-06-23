import { z, ZodType } from "zod";

export class MachineAreaValidation {

    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1).max(100)
    });

    static readonly UPDATE: ZodType = z.object({
        name: z.string().min(1).max(100)
    });


    static readonly SEARCH: ZodType = z.object({
        keyword: z.string().optional(),
        page: z.number().min(1).positive().optional(),
        limit: z.number().min(1).max(100).positive().optional(),
        paginate: z.boolean().optional()
    })
}
