import { Request, Response, NextFunction } from "express";
import { CreatePurchaseOrderRequest, SearchPurchaseOrderRequest } from "../model/purchase-order-model";
import { PurchaseOrderService } from "../service/purchase-order-service";
import { sendSuccess } from "../helper/response-helper";


export class PurchaseOrderController {



    static async get(req: Request, res: Response, next: NextFunction) {
        try {

            const request: SearchPurchaseOrderRequest = {
                keyword: req.query.keyword as string,
                page: isNaN(Number(req.query.page)) ? 1 : Number(req.query.page),
                limit: isNaN(Number(req.query.limit)) ? 10 : Number(req.query.limit),
                paginate: req.query.paginate === "true",
                start_date: typeof req.query.start_date === 'string' ? new Date(req.query.start_date) : undefined,
                end_date: typeof req.query.end_date === 'string' ? new Date(req.query.end_date) : undefined,
            };


            const response = await PurchaseOrderService.get(request);

            sendSuccess(res, 200, "Get PurchaseOrder success", response.data, response.pagination);
        } catch (e) {
            next(e);
        }
    }

    static async show(req: Request, res: Response, next: NextFunction) {
        try {
            const id: number = Number(req.params.id);
            const response = await PurchaseOrderService.show(id);
            sendSuccess(res, 200, "Get PurchaseOrder success", response);
        } catch (e) {
            next(e);
        }
    }
}