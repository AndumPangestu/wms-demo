import { SupplierResponse, CreateSupplierRequest, UpdateSupplierRequest, toSupplierResponse, SearchSupplierRequest } from "../model/supplier-model";
import { Validation } from "../validation/validation";
import { SupplierValidation } from "../validation/supplier-validation";
import { Supplier } from "@prisma/client";
import { prismaClient } from "../application/database";
import { logger } from "../application/logging";
import { ResponseError } from "../error/response-error";
import { Pageable } from "../model/page";


export class SupplierService {

    static async create(request: CreateSupplierRequest): Promise<SupplierResponse> {
        const createRequest = Validation.validate(SupplierValidation.CREATE, request);


        const isNameExist = await prismaClient.supplier.findFirst({
            where: {
                name: createRequest.name
            }
        });

        if (isNameExist) {
            throw new ResponseError(400, "Name already exists");
        }


        const Supplier = await prismaClient.supplier.create({
            data: createRequest
        });

        return toSupplierResponse(Supplier);
    }


    static async update(id: number, request: UpdateSupplierRequest): Promise<SupplierResponse> {

        if (isNaN(id)) {
            throw new ResponseError(400, "Invalid id");
        }

        const idISValid = await prismaClient.supplier.findUnique({
            where: {
                id: id
            }
        });

        if (!idISValid) {
            throw new ResponseError(404, "Supplier not found");
        }

        const updateRequest = Validation.validate(SupplierValidation.UPDATE, request);

        const isNameExist = await prismaClient.supplier.findFirst({
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




        const Supplier = await prismaClient.supplier.update({
            where: {
                id: id
            },
            data: updateRequest
        });

        return toSupplierResponse(Supplier);
    }


    static async get(request: SearchSupplierRequest): Promise<Pageable<SupplierResponse>> {


        const searchRequest = Validation.validate(SupplierValidation.SEARCH, request);

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

        const [suppliers, total] = await Promise.all([
            prismaClient.supplier.findMany({
                where: whereClause,
                ...(searchRequest.paginate ? { take: limit, skip } : {}),
            }),
            prismaClient.supplier.count({
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
            data: suppliers.map(toSupplierResponse),
            ...(pagination ? { pagination } : {})

        };
    }

    static async show(id: number): Promise<SupplierResponse> {

        if (isNaN(id)) {
            throw new ResponseError(400, "Invalid id");
        }

        const Supplier = await prismaClient.supplier.findUnique({
            where: {
                id: id
            }
        });

        if (!Supplier) {
            throw new ResponseError(404, "Supplier not found");
        }

        return toSupplierResponse(Supplier);
    }


    static async remove(id: number) {

        if (isNaN(id)) {
            throw new ResponseError(400, "Invalid id");
        }

        const idISValid = await prismaClient.supplier.findUnique({
            where: {
                id: id
            }
        });

        if (!idISValid) {
            throw new ResponseError(404, "Supplier not found");
        }


        await prismaClient.supplier.delete({
            where: {
                id: id
            }
        });
    }
}


