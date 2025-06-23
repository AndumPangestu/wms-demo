import { RackResponse, CreateRackRequest, UpdateRackRequest, toRackResponse, SearchRackRequest } from "../model/rack-model";
import { Validation } from "../validation/validation";
import { RackValidation } from "../validation/rack-validation";
import { Rack } from "@prisma/client";
import { prismaClient } from "../application/database";
import { logger } from "../application/logging";
import { ResponseError } from "../error/response-error";
import { Pageable } from "../model/page";


export class RackService {

    static async create(request: CreateRackRequest): Promise<RackResponse> {
        const createRequest = Validation.validate(RackValidation.CREATE, request);


        const isCodeExist = await prismaClient.rack.findFirst({
            where: {
                code: createRequest.code
            }
        });

        if (isCodeExist) {
            throw new ResponseError(400, "Code already exists");
        }

        const rack = await prismaClient.rack.create({
            data: createRequest
        });

        return toRackResponse(rack);
    }


    static async update(id: number, request: UpdateRackRequest): Promise<RackResponse> {

        if (isNaN(id)) {
            throw new ResponseError(400, "Invalid id");
        }

        const idISValid = await prismaClient.rack.findUnique({
            where: {
                id: id
            }
        });

        if (!idISValid) {
            throw new ResponseError(404, "Rack not found");
        }

        const updateRequest = Validation.validate(RackValidation.UPDATE, request);

        const isCodeExist = await prismaClient.rack.findFirst({
            where: {
                code: updateRequest.code,
                NOT: {
                    id: id
                }
            }
        });

        if (isCodeExist) {
            throw new ResponseError(400, "Code already exists");
        }

        const rack = await prismaClient.rack.update({
            where: {
                id: id
            },
            data: updateRequest
        });

        return toRackResponse(rack);
    }


    static async get(request: SearchRackRequest): Promise<Pageable<RackResponse>> {


        const searchRequest = Validation.validate(RackValidation.SEARCH, request);

        const filters: any[] = [];

        if (searchRequest.keyword) {
            filters.push({
                OR: [
                    {
                        code: {
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

        const [racks, total] = await Promise.all([
            prismaClient.rack.findMany({
                where: whereClause,
                ...(searchRequest.paginate ? { take: limit, skip } : {}),
            }),
            prismaClient.rack.count({
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
            data: racks.map(toRackResponse),
            ...(pagination ? { pagination } : {})

        };
    }

    static async show(id: number): Promise<RackResponse> {

        if (isNaN(id)) {
            throw new ResponseError(400, "Invalid id");
        }

        const rack = await prismaClient.rack.findUnique({
            where: {
                id: id
            }
        });

        if (!rack) {
            throw new ResponseError(404, "Rack not found");
        }

        return toRackResponse(rack);
    }


    static async remove(id: number) {

        if (isNaN(id)) {
            throw new ResponseError(400, "Invalid id");
        }


        const idISValid = await prismaClient.rack.findUnique({
            where: {
                id: id
            }
        });


        if (!idISValid) {
            throw new ResponseError(404, "Rack not found");
        }




        const isUsedKanban = await prismaClient.kanban.findMany({
            where: {
                rack_id: id
            }
        });

        if (isUsedKanban.length > 0) {
            throw new ResponseError(400, "Rack used in kanban data");
        }



        await prismaClient.rack.delete({
            where: {
                id: id
            }
        });
    }


}


