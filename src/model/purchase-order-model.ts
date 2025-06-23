import { PurchaseOrder } from "@prisma/client";
import { PurchaseOrderDetailResponse } from "./purchase-order-detail-model";
import { SupplierResponse } from "./supplier-model";

export type PurchaseOrderResponse = {
    id: number;
    department: string | null;
    supplier: SupplierResponse | null;
    po_number: string | null;
    po_date: Date | null;
    pr_date: Date | null;
    purchase_order_details: PurchaseOrderDetailResponse[];
}


export type PurchaseOrderRawEntry = {
    [key: string]: any;
    "Dept."?: any;
    Supplier?: any;
    "PO No."?: any;
    "PO Date"?: any;
    "SOB/PR Date"?: any;



}

export type CreatePurchaseOrderRequest = {
    department: string | null;
    supplier_id: number | null;
    po_number: string;
    po_date: Date | null;
    pr_date: Date | null;



}

export type SearchPurchaseOrderRequest = {
    keyword?: string;
    page: number;
    limit: number;
    paginate?: boolean;
    start_date?: Date;
    end_date?: Date;
}

export function toPurchaseOrderResponse(PurchaseOrder: any): PurchaseOrderResponse {
    return {
        id: PurchaseOrder.id,
        department: PurchaseOrder.department,
        supplier: PurchaseOrder.supplier || null,
        po_number: PurchaseOrder.po_number,
        po_date: PurchaseOrder.po_date,
        pr_date: PurchaseOrder.pr_date,
        purchase_order_details: PurchaseOrder.purchase_order_detail,
    };
}
