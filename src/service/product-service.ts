import { ProductResponse, CreateProductRequest, UpdateProductRequest, toProductResponse, SearchProductRequest, toProductDetailResponse } from "../model/product-model";
import { Validation } from "../validation/validation";
import { ProductValidation } from "../validation/product-validation";
import { Product } from "@prisma/client";
import { prismaClient } from "../application/database";
import { logger } from "../application/logging";
import { ResponseError } from "../error/response-error";
import { Pageable } from "../model/page";


export class ProductService {

    static async create(request: CreateProductRequest): Promise<ProductResponse> {
        const createRequest = Validation.validate(ProductValidation.CREATE, request);

        const result = await prismaClient.$transaction(async (tx) => {

            const isNameExist = await tx.product.findFirst({
                where: {
                    name: createRequest.name
                }
            });

            if (isNameExist) {
                throw new ResponseError(400, "Name already exists");
            }

            // Buat product baru
            const product = await tx.product.create({
                data: {
                    name: createRequest.name,
                    description: createRequest.description
                }
            });

            if (createRequest.product_kanbans.length === 0) {
                throw new ResponseError(400, "Product kanbans cannot be empty");
            }

            // Siapkan data relasi product-kanban
            const productKanbanRequest = createRequest.product_kanbans.map((productKanban) => ({
                product_id: product.id,
                kanban_id: productKanban.kanban_id,
                quantity: productKanban.quantity
            }));

            // Buat relasi product-kanban
            await tx.productKanban.createMany({
                data: productKanbanRequest
            });

            return product;
        });

        return toProductResponse(result);
    }



    static async update(id: number, request: UpdateProductRequest): Promise<ProductResponse> {
        if (isNaN(id)) {
            throw new ResponseError(400, "Invalid id");
        }

        const updateRequest = Validation.validate(ProductValidation.UPDATE, request);

        const updatedProduct = await prismaClient.$transaction(async (tx) => {
            // 1. Cek apakah produk ada
            const existingProduct = await tx.product.findUnique({
                where: { id }
            });

            if (!existingProduct) {
                throw new ResponseError(404, "Product not found");
            }

            // 2. Cek nama duplikat kecuali ID sendiri
            const isNameExist = await tx.product.findFirst({
                where: {
                    name: updateRequest.name,
                    NOT: { id }
                }
            });

            if (isNameExist) {
                throw new ResponseError(400, "Product name already exists");
            }

            // 3. Update product (tanpa product_kanban dulu)
            const product = await tx.product.update({
                where: { id },
                data: {
                    name: updateRequest.name,
                    description: updateRequest.description
                }
            });

            // 4. Hapus semua product_kanban lama
            await tx.productKanban.deleteMany({
                where: {
                    product_id: id
                }
            });

            // 5. Insert ulang product_kanban
            if (updateRequest.product_kanbans.length === 0) {
                throw new ResponseError(400, "Product kanbans cannot be empty");
            }

            const kanbanData = updateRequest.product_kanbans.map((pk) => ({
                product_id: id,
                kanban_id: pk.kanban_id,
                quantity: pk.quantity
            }));

            await tx.productKanban.createMany({
                data: kanbanData
            });

            return product;
        });

        return toProductResponse(updatedProduct);
    }




    static async get(request: SearchProductRequest): Promise<Pageable<ProductResponse>> {
        const searchRequest = Validation.validate(ProductValidation.SEARCH, request);



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

        const [products, total] = await Promise.all([
            prismaClient.product.findMany({
                where: whereClause,
                orderBy: {
                    created_at: "desc"
                },
                ...(searchRequest.paginate ? { take: limit, skip } : {}),
            }),
            prismaClient.product.count({
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
            data: products.map(toProductResponse),
            ...(pagination ? { pagination } : {})

        };
    }


    static async show(id: number) {

        if (isNaN(id)) {
            throw new ResponseError(400, "Invalid id");
        }

        const product = await prismaClient.product.findUnique({
            where: {
                id: id
            },
            include: {
                product_kanbans: true
            }
        });

        if (!product) {
            throw new ResponseError(404, "Product not found");
        }

        return toProductDetailResponse(product);
    }



    static async remove(id: number) {

        if (isNaN(id)) {
            throw new ResponseError(400, "Invalid id");
        }

        const idISValid = await prismaClient.product.findUnique({
            where: {
                id: id
            }
        });

        if (!idISValid) {
            throw new ResponseError(404, "Product not found");
        }

        await prismaClient.product.delete({
            where: {
                id: id
            }
        });
    }


}


