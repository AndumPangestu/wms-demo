
export type WorkOrderResponse = {
    id: number;
    code: string;
    status: string;
    ppic_name: string;
    created_at: Date;
}

export type WorkOrderDetailResponse = {
    id: number;
    code: string;
    work_order_products: WorkOrderProduct[];
    created_at: Date;
}

type WorkOrderProduct = {
    product_id: number;
    quantity: number;
}

export type CreateWorkOrderRequest = {
    work_order_products: WorkOrderProduct[];
}


export type UpdateWorkOrderRequest = {
    work_order_products: WorkOrderProduct[];
}


export type SearchWorkOrderRequest = {
    keyword?: string;
    page: number;
    limit: number;
    paginate?: boolean;
}


export function toWorkOrderResponse(WorkOrder: any): WorkOrderResponse {
    return {
        id: WorkOrder.id,
        code: WorkOrder.code,
        status: WorkOrder.status,
        ppic_name: WorkOrder.ppic.name,
        created_at: WorkOrder.created_at
    }
}

export function toWorkOrderDetailResponse(WorkOrder: any) {
    return {
        id: WorkOrder.id,
        code: WorkOrder.code,
        status: WorkOrder.status,
        ppic: {
            id: WorkOrder.ppic.id,
            name: WorkOrder.ppic.name
        },
        created_at: WorkOrder.created_at,
        work_order_products: WorkOrder.work_order_products.map((wop: any) => {
            const productKanbans = wop.product.product_kanbans;
            return {
                id: wop.id,
                quantity: wop.quantity,
                product: {
                    id: wop.product.id,
                    name: wop.product.name,
                    description: wop.product.description,
                    product_kanbans: productKanbans.map((pk: any) => ({
                        id: pk.id,
                        kanban_id: pk.kanban_id,
                        kanban_code: pk.kanban.code,
                        kanban_description: pk.kanban.description,
                        kanban_specification: pk.kanban.specification,
                        quantity: pk.quantity,
                        total_quantity: pk.quantity * wop.quantity

                    }))
                }
            }
        })
    };
}
