import { MakerResponse, CreateMakerRequest, UpdateMakerRequest, toMakerResponse, SearchMakerRequest } from "../model/maker-model";
import { Validation } from "../validation/validation";
import { MakerValidation } from "../validation/maker-validation";
import { Maker } from "@prisma/client";
import { prismaClient } from "../application/database";
import { logger } from "../application/logging";
import { ResponseError } from "../error/response-error";
import { Pageable } from "../model/page";


export class MakerService {

    static async create(request: CreateMakerRequest): Promise<MakerResponse> {
        const createRequest = Validation.validate(MakerValidation.CREATE, request);


        const isNameExist = await prismaClient.maker.findFirst({
            where: {
                name: createRequest.name
            }
        });

        if (isNameExist) {
            throw new ResponseError(400, "Name already exists");
        }


        const Maker = await prismaClient.maker.create({
            data: createRequest
        });

        return toMakerResponse(Maker);
    }


    static async update(id: number, request: UpdateMakerRequest): Promise<MakerResponse> {

        if (isNaN(id)) {
            throw new ResponseError(400, "Invalid id");
        }

        const idISValid = await prismaClient.maker.findUnique({
            where: {
                id: id
            }
        });

        if (!idISValid) {
            throw new ResponseError(404, "Maker not found");
        }

        const updateRequest = Validation.validate(MakerValidation.UPDATE, request);

        const isNameExist = await prismaClient.maker.findFirst({
            where: {
                name: updateRequest.name,
                NOT: {
                    id: id
                }
            }
        });

        if (isNameExist) {
            throw new ResponseError(400, "Name already exists");
        }




        const Maker = await prismaClient.maker.update({
            where: {
                id: id
            },
            data: updateRequest
        });

        return toMakerResponse(Maker);
    }


    static async get(request: SearchMakerRequest): Promise<Pageable<MakerResponse>> {


        const searchRequest = Validation.validate(MakerValidation.SEARCH, request);

        const filters: any[] = [];

        if (searchRequest.keyword) {
            filters.push({
                OR: [
                    {
                        name: {
                            contains: searchRequest.keyword

                        }
                    },
                ]
            });
        }

        const whereClause = filters.length > 0 ? { AND: filters } : {};

        // Default pagination values if not provided
        const page = searchRequest.page || 1;
        const limit = searchRequest.limit || 10;

        const skip = (page - 1) * limit;

        const [makers, total] = await Promise.all([
            prismaClient.maker.findMany({
                where: whereClause,
                ...(searchRequest.paginate ? { take: limit, skip } : {}),
            }),
            prismaClient.maker.count({
                where: whereClause,
            })
        ]);



        const pagination = searchRequest.paginate
            ? {
                curr_page: page,
                total_page: Math.ceil(total / limit),
                limit: limit,
                total: total
            }
            : undefined;


        return {
            data: makers.map(toMakerResponse),
            ...(pagination ? { pagination } : {})

        };
    }

    static async show(id: number): Promise<MakerResponse> {

        if (isNaN(id)) {
            throw new ResponseError(400, "Invalid id");
        }

        const Maker = await prismaClient.maker.findUnique({
            where: {
                id: id
            }
        });

        if (!Maker) {
            throw new ResponseError(404, "Maker not found");
        }

        return toMakerResponse(Maker);
    }


    static async remove(id: number) {

        if (isNaN(id)) {
            throw new ResponseError(400, "Invalid id");
        }

        const idISValid = await prismaClient.maker.findUnique({
            where: {
                id: id
            }
        });

        if (!idISValid) {
            throw new ResponseError(404, "Maker not found");
        }





        await prismaClient.maker.delete({
            where: {
                id: id
            }
        });
    }
}


