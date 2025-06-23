import { Rack, MachineArea, Machine, Supplier, Maker } from "@prisma/client";

export type KanbanResponse = {
    id: number;
    code: string;
    description: string | null;
    specification: string | null;
    min_quantity: number;
    max_quantity: number;
    balance: number;
    uom: string;
    lead_time: number;
    rack: Rack | null;
    machine_area: MachineArea | null;
    machine: Machine | null;
    stock_in_quantity: number | null;
    supplier: Supplier[] | null;
    maker: Maker | null;
    js_ending_quantity: number | null;
    stock_status: string | null;
    rank: string | null;
    order_point: number | null;
    currency: string | null;
    price: number | null;
    safety_stock: number | null;
    incoming_order_stock: number | null;
    is_completed: boolean;

}

export type KanbanRawEntry = {
    [key: string]: any;
    "CODE JS SYSTEM"?: any;
    AREA?: any;
    MESIN?: any;
    "CODE RACK"?: any;
    DESCRIPTION?: any;
    SPECIFICATION?: any;
    MAKER?: any;
    CURRENCY?: any;
    PRICE?: any;
    "Safety Stock"?: any;
    Rank?: any;
    UoM?: any;
    "Minimal Stock"?: any;
    "Maximal Stock"?: any;
    "Lead Time"?: any;
    "Order Point"?: any;

}


export type CreateKanbanRequest = {
    code: string;
    description: string | null;
    specification: string | null;
    min_quantity: number;
    max_quantity: number;
    balance: number;
    uom: string;
    lead_time: number;
    rack_id: number;
    machine_area_id: number | null;
    machine_id: number | null;
    supplier_id: number | null;
    maker_id: number | null;
    rank: string;
    order_point: number;
    currency: string;
    price: number;
    safety_stock: number;
}


export type CreateKanbanImportRequest = {
    code: string;
    description: string | null;
    specification: string | null;
    min_quantity: number | null;
    max_quantity: number | null;
    uom: string | null;
    lead_time: number | null;
    rack_id?: number;
    machine_area_id?: number;
    machine_id?: number;
    supplier_id?: number;
    maker_id?: number;
    rank: string | null;
    order_point: number | null;
    currency: string | null;
    price: number | null;
    safety_stock: number | null;
}

export type UpdateKanbanRequest = {
    code: string;
    description: string | null;
    specification: string | null;
    min_quantity: number;
    max_quantity: number;
    balance: number;
    uom: string;
    lead_time: number;
    rack_id: number;
    machine_area_id: number | null;
    machine_id: number | null;
    supplier_id: number | null;
    maker_id: number | null;
    rank: string;
    order_point: number;
    currency: string;
    price: number;
    safety_stock: number;
}

export type SearchKanbanRequest = {
    keyword?: string;
    page: number;
    limit: number;
    paginate?: boolean;
    rack_id?: number;
    machine_area_id?: number;
    machine_id?: number;
    stock_status?: string;
    completed_status?: string;
}

export function toKanbanResponse(Kanban: any): KanbanResponse {
    return {
        id: Kanban.id,
        code: Kanban.code,
        specification: Kanban.specification,
        description: Kanban.description,
        min_quantity: Kanban.min_quantity,
        max_quantity: Kanban.max_quantity,
        balance: Kanban.balance,
        uom: Kanban.uom,
        lead_time: Kanban.lead_time,
        rack: Kanban.rack || null,
        machine_area: Kanban.machine_area || null,
        machine: Kanban.machine || null,
        stock_in_quantity: Kanban.stock_in_quantity,
        supplier: Kanban.supplier,
        maker: Kanban.maker,
        js_ending_quantity: Kanban.js_ending_quantity,
        rank: Kanban.rank,
        order_point: Kanban.order_point,
        currency: Kanban.currency,
        price: Kanban.price,
        safety_stock: Kanban.safety_stock,
        stock_status: Kanban.min_quantity == null || Kanban.max_quantity == null ? "uncompleted" : (Kanban.balance < Kanban.min_quantity ? "Understock" : (Kanban.balance > Kanban.max_quantity ? "Overstock" : "Normal")),
        incoming_order_stock: Kanban.incoming_order_stock,
        is_completed: Kanban.specification == null || Kanban.description == null || Kanban.currency == null || Kanban.price == null || Kanban.safety_stock == null || Kanban.order_point == null || Kanban.min_quantity == null || Kanban.max_quantity == null || Kanban.uom == null || Kanban.lead_time == null || Kanban.rack_id == null || Kanban.machine_area_id == null || Kanban.machine_id == null || Kanban.maker_id == null ? false : true
    }
}