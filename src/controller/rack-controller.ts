import { Request, Response, NextFunction } from "express";
import { CreateRackRequest, UpdateRackRequest, SearchRackRequest } from "../model/rack-model";
import { RackService } from "../service/rack-service";
import { sendSuccess } from "../helper/response-helper";


export class RackController {

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateRackRequest = req.body as CreateRackRequest;
            const response = await RackService.create(request);

            sendSuccess(res, 200, "Create rack success", response);

        } catch (e) {
            next(e);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id: number = Number(req.params.id);
            const request: UpdateRackRequest = req.body as UpdateRackRequest;
            const response = await RackService.update(id, request);

            sendSuccess(res, 200, "Update rack success", response);
        } catch (e) {
            next(e);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {

            const request: SearchRackRequest = {
                keyword: req.query.keyword as string,
                page: isNaN(Number(req.query.page)) ? 1 : Number(req.query.page),
                limit: isNaN(Number(req.query.limit)) ? 10 : Number(req.query.limit),
                paginate: req.query.paginate === "true"
            };


            const response = await RackService.get(request);

            sendSuccess(res, 200, "Get rack success", response.data, response.pagination);
        } catch (e) {
            next(e);
        }
    }

    static async show(req: Request, res: Response, next: NextFunction) {
        try {
            const id: number = Number(req.params.id);
            const response = await RackService.show(id);
            sendSuccess(res, 200, "Get rack success", response);
        } catch (e) {
            next(e);
        }
    }

    static async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const id: number = Number(req.params.id);
            await RackService.remove(id);

            sendSuccess(res, 200, "Remove rack success");
        } catch (e) {
            next(e);
        }
    }
}