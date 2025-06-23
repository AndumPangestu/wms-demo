import { Operator } from "@prisma/client";

export type OperatorResponse = {
    id: number;
    nik: string;
    name: string;
}

export type CreateOperatorRequest = {
    nik: string;
    name: string;
}

export type UpdateOperatorRequest = {
    name?: string;
    nik?: string;
}

export type SearchOperatorRequest = {
    keyword?: string;
    page: number;
    limit: number;
    paginate?: boolean;
}

export function toOperatorResponse(operator: Operator): OperatorResponse {
    return {
        id: operator.id,
        name: operator.name,
        nik: operator.nik
    }
}
