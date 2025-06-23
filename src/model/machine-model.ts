import { Machine } from "@prisma/client";

export type MachineResponse = {
    id: number;
    code: string;

}

export type CreateMachineRequest = {
    code: string;

}

export type UpdateMachineRequest = {

    code?: string;
}

export type SearchMachineRequest = {
    keyword?: string;
    page: number;
    limit: number;
    paginate?: boolean;
}

export function toMachineResponse(rack: Machine): MachineResponse {
    return {
        id: rack.id,
        code: rack.code
    }
}
