import { MachineResponse, CreateMachineRequest, UpdateMachineRequest, toMachineResponse, SearchMachineRequest } from "../model/machine-model";
import { Validation } from "../validation/validation";
import { MachineValidation } from "../validation/machine-validation";
import { Machine } from "@prisma/client";
import { prismaClient } from "../application/database";
import { logger } from "../application/logging";
import { ResponseError } from "../error/response-error";
import { Pageable } from "../model/page";


export class MachineService {

    static async create(request: CreateMachineRequest): Promise<MachineResponse> {
        const createRequest = Validation.validate(MachineValidation.CREATE, request);


        const isCodeExist = await prismaClient.machine.findFirst({
            where: {
                code: createRequest.code
            }
        });

        if (isCodeExist) {
            throw new ResponseError(400, "Code already exists");
        }

        const machine = await prismaClient.machine.create({
            data: createRequest
        });

        return toMachineResponse(machine);
    }


    static async update(id: number, request: UpdateMachineRequest): Promise<MachineResponse> {

        if (isNaN(id)) {
            throw new ResponseError(400, "Invalid id");
        }

        const idISValid = await prismaClient.machine.findUnique({
            where: {
                id: id
            }
        });

        if (!idISValid) {
            throw new ResponseError(404, "Machine not found");
        }

        const updateRequest = Validation.validate(MachineValidation.UPDATE, request);

        const isCodeExist = await prismaClient.machine.findFirst({
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

        const machine = await prismaClient.machine.update({
            where: {
                id: id
            },
            data: updateRequest
        });

        return toMachineResponse(machine);
    }


    static async get(request: SearchMachineRequest): Promise<Pageable<MachineResponse>> {


        const searchRequest = Validation.validate(MachineValidation.SEARCH, request);

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

        const [machines, total] = await Promise.all([
            prismaClient.machine.findMany({
                where: whereClause,
                ...(searchRequest.paginate ? { take: limit, skip } : {}),
            }),
            prismaClient.machine.count({
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
            data: machines.map(toMachineResponse),
            ...(pagination ? { pagination } : {})

        };
    }

    static async show(id: number): Promise<MachineResponse> {

        if (isNaN(id)) {
            throw new ResponseError(400, "Invalid id");
        }

        const machine = await prismaClient.machine.findUnique({
            where: {
                id: id
            }
        });

        if (!machine) {
            throw new ResponseError(404, "Machine not found");
        }

        return toMachineResponse(machine);
    }


    static async remove(id: number) {

        if (isNaN(id)) {
            throw new ResponseError(400, "Invalid id");
        }


        const idISValid = await prismaClient.machine.findUnique({
            where: {
                id: id
            }
        });


        if (!idISValid) {
            throw new ResponseError(404, "Machine not found");
        }







        await prismaClient.machine.delete({
            where: {
                id: id
            }
        });
    }


}


