import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { Pageable } from "../model/page";
import { ReminderResponse, toReminderResponse, SearchReminderRequest } from "../model/reminder-model";
import { Validation } from "../validation/validation";
import { ReminderValidation } from "../validation/reminder-validation";


export class ReminderService {

    static async get(request: SearchReminderRequest): Promise<Pageable<ReminderResponse>> {

        const searchRequest = Validation.validate(ReminderValidation.SEARCH, request);

        const filters: any[] = [];

        if (searchRequest.keyword) {
            const keyword = searchRequest.keyword.replace(/\\/g, '\\\\');
            filters.push({
                OR: [
                    { code: { contains: keyword } },
                    { description: { contains: keyword } },
                    { specification: { contains: keyword } }
                ]
            });
        }

        filters.push({
            balance: {
                lt: prismaClient.kanban.fields.min_quantity
            }
        })

        const whereClause = filters.length > 0 ? { AND: filters } : {};

        const page = searchRequest.page || 1;
        const limit = searchRequest.limit || 10;

        const skip = (page - 1) * limit;

        const [reminders, total] = await Promise.all([
            prismaClient.kanban.findMany({
                where: whereClause,
                ...(searchRequest.paginate ? { take: limit, skip } : {}),
                include: {
                    purchase_request_detail: {
                        where: {
                            is_active: true
                        },
                        include: {
                            purchase_request: true
                        },

                        orderBy: {
                            purchase_request: {
                                date: 'desc'
                            }
                        }
                    },
                    purchase_order_detail: {
                        where: {
                            is_active: true
                        },
                        include: {
                            purchase_order: true
                        },
                        orderBy: {
                            purchase_order: {
                                po_date: 'desc'
                            }
                        }
                    },
                }
            }),
            prismaClient.kanban.count({
                where: whereClause,
            })
        ]);

        const data = reminders.map((kanban) => {
            const hasPR = kanban.purchase_request_detail.length > 0;
            const prDate = hasPR
                ? kanban.purchase_request_detail[0]?.purchase_request?.date ?? null
                : null;

            const prStatus = hasPR ? "Requested" : "Not Requested";

            const poDetails = kanban.purchase_order_detail;
            let poStatus = "Not Ordered";
            let poDate = null;

            if (poDetails.length > 0) {
                const ordered = poDetails.find((po) => po.status === "Partial Delivery");
                if (ordered) {
                    poStatus = "Partial Delivery";
                    poDate = ordered.purchase_order?.po_date ?? null;
                } else {
                    const firstDetail = poDetails[0];
                    poStatus = firstDetail.status ?? "On Order";
                    poDate = firstDetail.purchase_order?.po_date ?? null;
                }
            }

            const reminderResponse: ReminderResponse = {
                code: kanban.code,
                description: kanban.description,
                specification: kanban.specification,
                pr_status: prStatus,
                pr_date: prDate,
                po_status: poStatus,
                po_date: poDate
            };

            return reminderResponse;
        });


        const pagination = searchRequest.paginate
            ? {
                curr_page: page,
                total_page: Math.ceil(total / limit),
                limit: limit,
                total: total
            }
            : undefined;


        return {
            data: data.map(toReminderResponse),
            ...(pagination ? { pagination } : {})

        };
    }
}

