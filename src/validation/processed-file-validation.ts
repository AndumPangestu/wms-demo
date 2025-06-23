import { z, ZodType } from "zod";

export class ProcessedFileValidation {

    static readonly CREATE: ZodType = z.object({
        file_name: z.string().min(1).max(100),
        type: z.string().min(1).max(100),
    });
}
