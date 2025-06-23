import { PurchaseRequest } from "@prisma/client";
import { PurchaseRequestDetailResponse } from "./purchase-request-detail-model";

export type PurchaseRequestResponse = {
    id: number;
    date: Date | null;
    pr_number: string | null;
    department: string | null;
    budget_number: string | null;
    fixed_asset_number: string | null;
    type: string | null;
    transportation: string | null;
    kind_of_request: string | null;
    requested: string | null;
    gen_manager: string | null;
    supervisor: string | null;
    purchase_request_details: PurchaseRequestDetailResponse[];

};

export type PurchaseRequestRawEntry = {
    [key: string]: any;
    Date?: any;
    "PR No."?: any;
    Department?: any;
    "Budget No."?: any;
    "Fixed Asset No"?: any;
    Type?: any;
    Transportation?: any;
    "Kind of Request"?: any;
    Requested?: any;
    "Gen. Manager"?: any;
    Supervisor?: any;
}


export type CreatePurchaseRequestRequest = {
    date: Date | null;
    pr_number: string | null;
    department: string | null;
    budget_number: string | null;
    fixed_asset_number: string | null;
    type: string | null;
    transportation: string | null;
    kind_of_request: string | null;
    requested: string | null;
    gen_manager: string | null;
    supervisor: string | null;
};


export type SearchPurchaseRequestRequest = {
    keyword?: string;
    page: number;
    limit: number;
    paginate?: boolean;
    start_date?: Date;
    end_date?: Date;
}

export function toPurchaseRequestResponse(p: any): PurchaseRequestResponse {
    return {
        id: p.id,
        date: p.date,
        pr_number: p.pr_number,
        department: p.department,
        budget_number: p.budget_number,
        fixed_asset_number: p.fixed_asset_number,
        type: p.type,
        transportation: p.transportation,
        kind_of_request: p.kind_of_request,
        requested: p.requested,
        gen_manager: p.gen_manager,
        supervisor: p.supervisor,
        purchase_request_details: p.purchase_request_detail,

    };
}
