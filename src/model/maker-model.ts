import { Maker } from "@prisma/client";

export type MakerResponse = {
    id: number;
    name: string;

}

export type CreateMakerRequest = {
    code: string;
    name: string;

}

export type UpdateMakerRequest = {
    name?: string;

}

export type SearchMakerRequest = {
    keyword?: string;
    page: number;
    limit: number;
    paginate?: boolean;
}

export function toMakerResponse(Maker: Maker): MakerResponse {
    return {
        id: Maker.id,
        name: Maker.name,
    }
}
