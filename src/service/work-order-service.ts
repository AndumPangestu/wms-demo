import { WorkOrderResponse, CreateWorkOrderRequest, UpdateWorkOrderRequest, toWorkOrderResponse, SearchWorkOrderRequest, toWorkOrderDetailResponse, toWorkOrderProcessRequest } from "../model/work-order-model";
import { Validation } from "../validation/validation";
import { WorkOrderValidation } from "../validation/work-order-validation";
import { WorkOrder } from "@prisma/client";
import { prismaClient } from "../application/database";
import { logger } from "../application/logging";
import { ResponseError } from "../error/response-error";
import { Pageable } from "../model/page";
import { WebhookRequest } from "../model/webhook-model";
import { WorkOrderProcessService } from "./work-order-process-service";
import WebSocket from "ws";


export class WorkOrderService {

    static async generateWorkOrderCode(): Promise<string> {
        const today = new Date();

        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();

        const datePart = `${day}${month}${year}`;

        const startOfDay = new Date(today);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(today);
        endOfDay.setHours(23, 59, 59, 999);

        // Ambil WorkOrder terakhir berdasarkan created_at hari ini
        const lastWorkOrderToday = await prismaClient.workOrder.findFirst({
            where: {
                created_at: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
            orderBy: {
                code: 'desc', // Mengurutkan berdasarkan kode paling akhir
            },
        });

        let orderNumber = 1;

        if (lastWorkOrderToday?.code) {
            const lastCode = lastWorkOrderToday.code;
            const lastNumberStr = lastCode.slice(-4); // Ambil 4 digit terakhir
            const lastNumber = parseInt(lastNumberStr, 10);
            orderNumber = lastNumber + 1;
        }

        const orderNumberPart = String(orderNumber).padStart(4, '0');

        return `${datePart}${orderNumberPart}`; // Contoh: "230620250001"
    }


    static async create(request: CreateWorkOrderRequest, userId: number | undefined): Promise<WorkOrderResponse> {
        const createRequest = Validation.validate(WorkOrderValidation.CREATE, request);

        const result = await prismaClient.$transaction(async (tx) => {

            if (!userId || isNaN(userId) || userId === undefined) {
                throw new ResponseError(400, "User id is required");
            }

            const code = await this.generateWorkOrderCode();

            const isCodeExist = await tx.workOrder.findFirst({
                where: {
                    code: code
                }
            });

            if (isCodeExist) {
                throw new ResponseError(400, "Code already exists");
            }

            // Buat workOrder baru
            const workOrder = await tx.workOrder.create({
                data: {
                    code: code,
                    ppic_id: userId
                },
                include: {
                    ppic: true
                }
            });

            if (createRequest.work_order_products.length === 0) {
                throw new ResponseError(400, "Work Order products cannot be empty");
            }

            // Siapkan data relasi workOrder-kanban
            const workOrderProductRequest = createRequest.work_order_products.map((workOrderProduct) => ({
                work_order_id: workOrder.id,
                product_id: workOrderProduct.product_id,
                quantity: workOrderProduct.quantity
            }));

            // Buat relasi workOrder-kanban
            await tx.workOrderProduct.createMany({
                data: workOrderProductRequest
            });

            return workOrder;
        });

        return toWorkOrderResponse(result);
    }



    static async update(id: number, request: UpdateWorkOrderRequest, userId: number | undefined): Promise<WorkOrderResponse> {

        if (!userId || isNaN(userId) || userId === undefined) {
            throw new ResponseError(401, "Unauthorized");
        }

        if (isNaN(id)) {
            throw new ResponseError(400, "Invalid id");
        }

        const updateRequest = Validation.validate(WorkOrderValidation.UPDATE, request);

        const updatedWorkOrder = await prismaClient.$transaction(async (tx) => {
            // 1. Cek apakah produk ada
            const existingWorkOrder = await tx.workOrder.findUnique({
                where: { id },
                include: {
                    ppic: true
                }
            });

            if (!existingWorkOrder) {
                throw new ResponseError(404, "Work Order not found");
            }

            if (existingWorkOrder.ppic_id !== userId) {
                throw new ResponseError(403, "Forbidden");
            }

            // 4. Hapus semua workOrder_kanban lama
            await tx.workOrderProduct.deleteMany({
                where: {
                    work_order_id: id
                }
            });

            // 5. Insert ulang workOrder_kanban
            if (updateRequest.work_order_products.length === 0) {
                throw new ResponseError(400, "Work Order products cannot be empty");
            }

            const productData = updateRequest.work_order_products.map((pk) => ({
                work_order_id: id,
                product_id: pk.product_id,
                quantity: pk.quantity
            }));

            await tx.workOrderProduct.createMany({
                data: productData
            });

            return existingWorkOrder;
        });

        return toWorkOrderResponse(updatedWorkOrder);
    }




    static async get(request: SearchWorkOrderRequest): Promise<Pageable<WorkOrderResponse>> {
        const searchRequest = Validation.validate(WorkOrderValidation.SEARCH, request);



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

        const [workOrders, total] = await Promise.all([
            prismaClient.workOrder.findMany({
                where: whereClause,
                orderBy: {
                    created_at: 'desc'
                },
                ...(searchRequest.paginate ? { take: limit, skip } : {}),
                include: {
                    ppic: true
                }

            }),
            prismaClient.workOrder.count({
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
            data: workOrders.map(toWorkOrderResponse),
            ...(pagination ? { pagination } : {})

        };
    }


    static async show(id: number) {

        if (isNaN(id)) {
            throw new ResponseError(400, "Invalid id");
        }

        const workOrder = await prismaClient.workOrder.findUnique({
            where: {
                id: id
            },
            include: {
                work_order_products: {
                    include: {
                        product: {
                            include: {
                                product_kanbans: {
                                    include: {
                                        kanban: {
                                            include: {
                                                rack: {
                                                    select: {
                                                        code: true
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                ppic: true
            }
        });

        if (!workOrder) {
            throw new ResponseError(404, "Work Order not found");
        }

        return toWorkOrderDetailResponse(workOrder);
    }

    static async startWorkOrderProcess(id: number) {

        const workOrder = await prismaClient.workOrder.findUnique({
            where: { id },
            select: {
                code: true,                                // → Work-order code
                work_order_products: {
                    select: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                product_kanbans: {
                                    select: {
                                        kanban: {
                                            select: {
                                                id: true,
                                                code: true,
                                                rack: {
                                                    select: {
                                                        device_id: true,       // ganti dengan nama kolom di DB
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (!workOrder) {
            throw new ResponseError(404, "Work Order not found");
        }


        const workOrderProcessRequest = toWorkOrderProcessRequest(workOrder);

        WorkOrderProcessService.instance.startProcessingWorkOrder(workOrderProcessRequest);

    }

    static async updateStatus(id: number, status: string, userId: number | undefined) {

        if (!status) {
            throw new ResponseError(400, "Status cannot be empty");
        }

        if (!userId || isNaN(userId) || userId === undefined) {
            throw new ResponseError(401, "Unauthorized");
        }

        if (isNaN(id)) {
            throw new ResponseError(400, "Invalid id");
        }

        const workerOrder = await prismaClient.workOrder.findUnique({
            where: {
                id: id
            }
        });

        if (!workerOrder) {
            throw new ResponseError(404, "Work Order not found");
        }

        if (workerOrder.ppic_id !== userId) {
            throw new ResponseError(403, "Forbidden");
        }

        const updatedWorkOrder = await prismaClient.workOrder.update({
            where: {
                id: id
            },
            data: {
                status: status
            },
            include: {
                ppic: true
            }
        });

        return toWorkOrderResponse(updatedWorkOrder);

    }



    static async remove(id: number, userId: number | undefined) {

        if (!userId || isNaN(userId) || userId === undefined) {
            throw new ResponseError(401, "Unauthorized");
        }

        if (isNaN(id)) {
            throw new ResponseError(400, "Invalid id");
        }

        const workerOrder = await prismaClient.workOrder.findUnique({
            where: {
                id: id
            }
        });

        if (!workerOrder) {
            throw new ResponseError(404, "Work Order not found");
        }

        if (workerOrder.ppic_id !== userId) {
            throw new ResponseError(403, "Forbidden");
        }

        await prismaClient.workOrder.delete({
            where: {
                id: id
            }
        });
    }


    static async webhookWorkOrderProcess(req: WebhookRequest) {
        await WorkOrderProcessService.instance.webhookWorkOrderProcess(req);
    }



}


