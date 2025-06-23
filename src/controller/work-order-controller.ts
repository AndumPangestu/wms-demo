import { Request, Response, NextFunction } from "express";
import { CreateWorkOrderRequest, UpdateWorkOrderRequest, SearchWorkOrderRequest } from "../model/work-order-model";
import { WorkOrderService } from "../service/work-order-service";
import { sendSuccess } from "../helper/response-helper";


export class WorkOrderController {

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateWorkOrderRequest = req.body as CreateWorkOrderRequest;
            const response = await WorkOrderService.create(request);

            sendSuccess(res, 200, "Create work order success", response);

        } catch (e) {
            next(e);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id: number = Number(req.params.id);
            const request: UpdateWorkOrderRequest = req.body as UpdateWorkOrderRequest;
            const response = await WorkOrderService.update(id, request);

            sendSuccess(res, 200, "Update work order success", response);
        } catch (e) {
            next(e);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {

            const request: SearchWorkOrderRequest = {
                keyword: req.query.keyword as string,
                page: isNaN(Number(req.query.page)) ? 1 : Number(req.query.page),
                limit: isNaN(Number(req.query.limit)) ? 10 : Number(req.query.limit),
                paginate: req.query.paginate === "true"
            };


            const response = await WorkOrderService.get(request);

            sendSuccess(res, 200, "Get work order success", response.data, response.pagination);
        } catch (e) {
            next(e);
        }
    }


    static async show(req: Request, res: Response, next: NextFunction) {
        try {
            const id: number = Number(req.params.id);
            const response = await WorkOrderService.show(id);
            sendSuccess(res, 200, "Get work order success", response);
        } catch (e) {
            next(e);
        }
    }

    static async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const id: number = Number(req.params.id);
            await WorkOrderService.remove(id);

            sendSuccess(res, 200, "Remove work order success");
        } catch (e) {
            next(e);
        }
    }
}