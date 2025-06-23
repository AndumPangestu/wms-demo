import { Kanban, Operator } from "@prisma/client";

export type StockOutResponse = {
    id: number;
    kanban_code: string | null;
    quantity: number | null;
    machine: string | null;
    machine_area: string | null;
    kanban: Kanban | null;
    operator: Operator | null;
    created_at: Date;
}

export type CreateStockOutRequest = {
    kanban_code: string;
    machine_id: number;
    machine_area_id: number;
    quantity: number;
    operator_id: number;
}

export type UpdateStockOutRequest = {
    quantity: number;
}


export type SearchStockOutRequest = {
    keyword?: string;
    page: number;
    limit: number;
    paginate?: boolean;
    start_date?: Date;
    end_date?: Date;
    machine_id?: number;
    machine_area_id?: number;
}


export function toStockOutResponse(stockOut: any): StockOutResponse {
    return {
        id: stockOut.id,
        kanban_code: stockOut.kanban_code,
        machine: stockOut.machine,
        machine_area: stockOut.machine_area,
        quantity: stockOut.quantity,
        kanban: stockOut.kanban,
        operator: stockOut.operator,
        created_at: stockOut.created_at
    }
}
