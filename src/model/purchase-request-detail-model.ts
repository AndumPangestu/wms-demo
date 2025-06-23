import { PurchaseRequestDetail } from "@prisma/client";

export type PurchaseRequestDetailResponse = {
    id: number;
    pr_number: string | null;
    acc: string | null;
    kanban_code: string | null;
    item_name: string | null;
    description_of_goods: string | null;
    specification: string | null;
    part: string | null;
    quantity: number | null;
    unit: string | null;
    est_unit_price: number | null;
    est_amount: number | null;
    currency: string | null;
    req_delivery: Date | null;
    supplier: string | null;
    remark: string | null;
    purpose: string | null;

};

export type PurchaseRequestDetailRawEntry = {
    [key: string]: any;
    "PR No."?: any;
    Acc?: any;
    "Item Code"?: any;
    "Item Name"?: any;
    "Description of Goods"?: any;
    Specification?: any;
    Part?: any;
    Quantity?: any;
    Unit?: any;
    "Est. Unit Price"?: any;
    "Est. Amount"?: any;
    Currency?: any;
    "Req. Delivery"?: any;
    Supplier?: any;
    Remark?: any;
    Purpose?: any;

}


export type CreatePurchaseRequestDetailRequest = {
    pr_number: string | null;
    acc: string | null;
    kanban_code: string | null;
    item_name: string | null;
    description_of_goods: string | null;
    specification: string | null;
    part: string | null;
    quantity: number | null;
    unit: string | null;
    est_unit_price: number | null;
    est_amount: number | null;
    currency: string | null;
    req_delivery: Date | null;
    supplier: string | null;
    remark: string | null;
    purpose: string | null;

};


export type SearchPurchaseRequestDetailRequest = {
    keyword?: string;
    page: number;
    limit: number;
    paginate?: boolean;
}

export function toPurchaseRequestDetailResponse(p: PurchaseRequestDetail): PurchaseRequestDetailResponse {
    return {
        id: p.id,
        pr_number: p.pr_number,
        acc: p.acc,
        kanban_code: p.kanban_code,
        item_name: p.item_name,
        description_of_goods: p.description_of_goods,
        specification: p.specification,
        part: p.part,
        quantity: p.quantity,
        unit: p.unit,
        est_unit_price: p.est_unit_price,
        est_amount: p.est_amount,
        currency: p.currency,
        req_delivery: p.req_delivery,
        supplier: p.supplier,
        remark: p.remark,
        purpose: p.purpose,

    };
}
