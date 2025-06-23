
export type WorkOrderResponse = {
    id: number;
    code: string;
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
        created_at: WorkOrder.created_at
    }
}

export function toWorkOrderDetailResponse(WorkOrder: any): WorkOrderDetailResponse {
    return {
        id: WorkOrder.id,
        code: WorkOrder.code,
        work_order_products: WorkOrder.work_order_products,
        created_at: WorkOrder.created_at
    }
}
