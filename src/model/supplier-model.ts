import { Supplier } from "@prisma/client";

export type SupplierResponse = {
    id: number;
    name: string;

}

export type CreateSupplierRequest = {
    code: string;
    name: string;

}

export type UpdateSupplierRequest = {
    name?: string;

}

export type SearchSupplierRequest = {
    keyword?: string;
    page: number;
    limit: number;
    paginate?: boolean;
}

export function toSupplierResponse(Supplier: Supplier): SupplierResponse {
    return {
        id: Supplier.id,
        name: Supplier.name,
    }
}
