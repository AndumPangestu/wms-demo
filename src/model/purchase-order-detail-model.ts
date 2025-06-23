import { PurchaseOrderDetail } from "@prisma/client";

export type PurchaseOrderDetailResponse = {
    id: number;
    po_number: string | null;
    pr_number: string | null;
    pr_requested: string | null;
    kanban_code: string | null;
    description: string | null;
    specification: string | null;
    quantity: number | null;
    unit: string | null;
    status: string | null;
    remark: string | null;

}


export type PurchaseOrderDetailRawEntry = {
    [key: string]: any;
    "PO No."?: any;
    "SOB/PR No."?: any;
    "Product Code"?: any;
    pr_requested?: any;
    Description?: any;
    specification?: any;
    Quantity?: any;
    Unit?: any;
    Status?: any;
    Remark?: any;
}

export type CreatePurchaseOrderDetailRequest = {
    po_number: string;
    pr_number: string | null;
    pr_requested: string | null;
    kanban_code: string | null;
    description: string | null;
    specification: string | null;
    quantity: number | null;
    unit: string | null;
    status: string | null;
    remark: string | null;
}

export type SearchPurchaseOrderDetailRequest = {
    keyword?: string;
    page: number;
    limit: number;
    paginate?: boolean;
}

export function toPurchaseOrderDetailResponse(PurchaseOrderDetail: PurchaseOrderDetail): PurchaseOrderDetailResponse {
    return {
        id: PurchaseOrderDetail.id,
        po_number: PurchaseOrderDetail.po_number,
        pr_number: PurchaseOrderDetail.pr_number,
        pr_requested: PurchaseOrderDetail.pr_requested,
        kanban_code: PurchaseOrderDetail.kanban_code,
        description: PurchaseOrderDetail.description,
        specification: PurchaseOrderDetail.specification,
        quantity: PurchaseOrderDetail.quantity,
        unit: PurchaseOrderDetail.unit,
        status: PurchaseOrderDetail.status,
        remark: PurchaseOrderDetail.remark,
    }
}
