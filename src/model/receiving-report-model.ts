
export type ReceivingReportRawEntry = {
    [key: string]: any;
    "Product Code"?: any;
    Received?: any;
}

export type CreateReceivingReportRequest = {
    kanban_code: string;
    received_quantity: number;
}

