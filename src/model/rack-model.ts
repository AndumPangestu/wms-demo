import { Rack } from "@prisma/client";

export type RackResponse = {
    id: number;
    code: string;

}

export type CreateRackRequest = {
    code: string;

}

export type UpdateRackRequest = {

    code?: string;
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
        code: rack.code
    }
}
