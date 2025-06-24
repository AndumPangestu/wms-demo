import { Rack } from "@prisma/client";

export type RackResponse = {
    id: number;
    code: string;
    device_id: number | null;

}

export type CreateRackRequest = {
    code: string;
    device_id: number;

}

export type UpdateRackRequest = {
    code: string;
    device_id: number;
}

export type SearchRackRequest = {
    keyword?: string;
    page: number;
    limit: number;
    paginate?: boolean;
}

export function toRackResponse(rack: Rack): RackResponse {
    return {
        id: rack.id,
        code: rack.code,
        device_id: rack.device_id
    }
}
