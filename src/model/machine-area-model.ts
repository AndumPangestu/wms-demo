import { MachineArea } from "@prisma/client";

export type MachineAreaResponse = {
    id: number;
    name: string;
}

export type CreateMachineAreaRequest = {
    name: string;
}

export type UpdateMachineAreaRequest = {
    name?: string;

}

export type SearchMachineAreaRequest = {
    keyword?: string;
    page: number;
    limit: number;
    paginate?: boolean;
}

export function toMachineAreaResponse(machineArea: MachineArea): MachineAreaResponse {
    return {
        id: machineArea.id,
        name: machineArea.name,
    }
}
