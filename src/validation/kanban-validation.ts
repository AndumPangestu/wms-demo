import { z, ZodType } from "zod";

const KanbanSchema = z.object({
    code: z.string().min(1).max(100),
    min_quantity: z.number().min(0),
    max_quantity: z.number().min(0),
    description: z.string().max(255).optional().nullable(),
    specification: z.string().max(255).optional().nullable(),
    balance: z.number().min(0),
    uom: z.string().max(10),
    lead_time: z.number().min(0),
    rack_id: z.number().min(0),
    machine_id: z.number().min(0).optional().nullable(),
    machine_area_id: z.number().min(0).optional().nullable(),
    supplier_id: z.number().min(0).optional().nullable(),
    maker_id: z.number().min(0),
    safety_stock: z.number().min(0),
    order_point: z.number().min(0),
    price: z.number().min(0),
    currency: z.string().max(10),
    rank: z.string().max(1)
});

const kanbanImportSchema = z.object({
    code: z.string().min(1).max(100),
    min_quantity: z.number().min(0).optional().nullable(),
    max_quantity: z.number().min(0).optional().nullable(),
    description: z.string().max(255).optional().nullable(),
    specification: z.string().max(255).optional().nullable(),
    uom: z.string().max(10).optional().nullable(),
    lead_time: z.number().min(0).optional().nullable(),
    rack_id: z.number().min(0).optional().nullable(),
    machine_id: z.number().min(0).optional().nullable(),
    machine_area_id: z.number().min(0).optional().nullable(),
    maker_id: z.number().min(0).optional().nullable(),
    safety_stock: z.number().min(0).optional().nullable(),
    order_point: z.number().min(0).optional().nullable(),
    price: z.number().min(0).optional().nullable(),
    currency: z.string().max(10).optional().nullable(),
    rank: z.string().max(1).optional().nullable()
})


export class KanbanValidation {


    static readonly CREATE_MULTIPLE: ZodType = z.array(kanbanImportSchema);

    static readonly CREATE: ZodType = KanbanSchema

    static readonly UPDATE: ZodType = KanbanSchema

    static readonly SEARCH: ZodType = z.object({
        keyword: z.string().optional(),
        page: z.number().min(0).positive().optional(),
        limit: z.number().min(0).max(100).positive().optional(),
        paginate: z.boolean().optional(),
        rack_id: z.number().min(0).positive().optional(),
        machine_area_id: z.number().min(0).positive().optional(),
        machine_id: z.number().min(0).positive().optional(),
        stock_status: z.string().optional(),
        completed_status: z.string().optional(),
    })
}
