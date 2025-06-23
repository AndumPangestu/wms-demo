import { Request, Response, NextFunction } from "express";
import { CreateOperatorRequest, UpdateOperatorRequest, SearchOperatorRequest } from "../model/operator-model";
import { OperatorService } from "../service/operator-service";
import { sendSuccess } from "../helper/response-helper";


export class OperatorController {

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateOperatorRequest = req.body as CreateOperatorRequest;
            const response = await OperatorService.create(request);

            sendSuccess(res, 200, "Create operator success", response);

        } catch (e) {
            next(e);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id: number = Number(req.params.id);
            const request: UpdateOperatorRequest = req.body as UpdateOperatorRequest;
            const response = await OperatorService.update(id, request);

            sendSuccess(res, 200, "Update operator success", response);
        } catch (e) {
            next(e);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {

            const request: SearchOperatorRequest = {
                keyword: req.query.keyword as string,
                page: isNaN(Number(req.query.page)) ? 1 : Number(req.query.page),
                limit: isNaN(Number(req.query.limit)) ? 10 : Number(req.query.limit),
                paginate: req.query.paginate === "true"
            };


            const response = await OperatorService.get(request);

            sendSuccess(res, 200, "Get operator success", response.data, response.pagination);
        } catch (e) {
            next(e);
        }
    }


    static async show(req: Request, res: Response, next: NextFunction) {
        try {
            const id: number = Number(req.params.id);
            const response = await OperatorService.show(id);
            sendSuccess(res, 200, "Get operator success", response);
        } catch (e) {
            next(e);
        }
    }

    static async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const id: number = Number(req.params.id);
            await OperatorService.remove(id);

            sendSuccess(res, 200, "Remove operator success");
        } catch (e) {
            next(e);
        }
    }
}