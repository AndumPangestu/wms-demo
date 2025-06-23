
import { Kanban, Operator } from "@prisma/client";

export type StockInResponse = {
    id: number;
    kanban_code: string | null;
    quantity: number | null;
    kanban: Kanban | null;
    operator: Operator | null;
    created_at: Date;
}

export type CreateStockInRequest = {
    kanban_code: string;
    operator_id: number;
}


export type SearchStockInRequest = {
    keyword?: string;
    page: number;
    limit: number;
    paginate?: boolean;
    start_date?: Date;
    end_date?: Date;
}


export function toStockInResponse(stockIn: any): StockInResponse {
    return {
        id: stockIn.id,
        kanban_code: stockIn.kanban_code,
        quantity: stockIn.quantity,
        kanban: stockIn.kanban,
        operator: stockIn.operator,
        created_at: stockIn.created_at

    }
}
