import { MachineAreaResponse, CreateMachineAreaRequest, UpdateMachineAreaRequest, toMachineAreaResponse, SearchMachineAreaRequest } from "../model/machine-area-model";
import { Validation } from "../validation/validation";
import { MachineAreaValidation } from "../validation/machine-area-validation";
import { MachineArea } from "@prisma/client";
import { prismaClient } from "../application/database";
import { logger } from "../application/logging";
import { ResponseError } from "../error/response-error";
import { Pageable } from "../model/page";


export class MachineAreaService {

    static async create(request: CreateMachineAreaRequest): Promise<MachineAreaResponse> {
        const createRequest = Validation.validate(MachineAreaValidation.CREATE, request);


        const isCodeExist = await prismaClient.machineArea.findFirst({
            where: {
                name: createRequest.name
            }
        });

        if (isCodeExist) {
            throw new ResponseError(400, "Code already exists");
        }

        const machineArea = await prismaClient.machineArea.create({
            data: createRequest
        });

        return toMachineAreaResponse(machineArea);
    }


    static async update(id: number, request: UpdateMachineAreaRequest): Promise<MachineAreaResponse> {

        if (isNaN(id)) {
            throw new ResponseError(400, "Invalid id");
        }


        const idISValid = await prismaClient.machineArea.findUnique({
            where: {
                id: id
            }
        });

        if (!idISValid) {
            throw new ResponseError(404, "Machine Area not found");
        }

        const updateRequest = Validation.validate(MachineAreaValidation.UPDATE, request);

        const isCodeExist = await prismaClient.machineArea.findFirst({
            where: {
                name: updateRequest.name,
                NOT: {
                    id: id
                }
            }
        });

        if (isCodeExist) {
            throw new ResponseError(400, "Code already exists");
        }

        const machineArea = await prismaClient.machineArea.update({
            where: {
                id: id
            },
            data: updateRequest
        });

        return toMachineAreaResponse(machineArea);
    }


    static async get(request: SearchMachineAreaRequest): Promise<Pageable<MachineAreaResponse>> {


        const searchRequest = Validation.validate(MachineAreaValidation.SEARCH, request);



        const filters: any[] = [];

        if (searchRequest.keyword) {
            filters.push({
                OR: [
                    {
                        name: {
                            contains: searchRequest.keyword

                        }
                    }
                ]
            });
        }

        const whereClause = filters.length > 0 ? { AND: filters } : {};

        // Default pagination values if not provided
        const page = searchRequest.page || 1;
        const limit = searchRequest.limit || 10;

        const skip = (page - 1) * limit;

        const [machineAreas, total] = await Promise.all([
            prismaClient.machineArea.findMany({
                where: whereClause,
                ...(searchRequest.paginate ? { take: limit, skip } : {}),
            }),
            prismaClient.machineArea.count({
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
            data: machineAreas.map(toMachineAreaResponse),
            ...(pagination ? { pagination } : {})

        };
    }

    static async show(id: number): Promise<MachineAreaResponse> {

        if (isNaN(id)) {
            throw new ResponseError(400, "Invalid id");
        }

        const machineArea = await prismaClient.machineArea.findUnique({
            where: {
                id: id
            }
        });

        if (!machineArea) {
            throw new ResponseError(404, "MachineArea not found");
        }

        return toMachineAreaResponse(machineArea);
    }


    static async remove(id: number) {

        if (isNaN(id)) {
            throw new ResponseError(400, "Invalid id");
        }


        const idISValid = await prismaClient.machineArea.findUnique({
            where: {
                id: id
            }
        });

        if (!idISValid) {
            throw new ResponseError(404, "Machine Area not found");
        }




        await prismaClient.machineArea.delete({
            where: {
                id: id
            }
        });
    }


}


