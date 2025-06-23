import { Request, Response, NextFunction } from "express";
import { CreateMakerRequest, UpdateMakerRequest, SearchMakerRequest } from "../model/maker-model";
import { MakerService } from "../service/maker-service";
import { sendSuccess } from "../helper/response-helper";


export class MakerController {

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateMakerRequest = req.body as CreateMakerRequest;
            const response = await MakerService.create(request);

            sendSuccess(res, 200, "Create Maker success", response);

        } catch (e) {
            next(e);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id: number = Number(req.params.id);
            const request: UpdateMakerRequest = req.body as UpdateMakerRequest;
            const response = await MakerService.update(id, request);

            sendSuccess(res, 200, "Update Maker success", response);
        } catch (e) {
            next(e);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {

            const request: SearchMakerRequest = {
                keyword: req.query.keyword as string,
                page: isNaN(Number(req.query.page)) ? 1 : Number(req.query.page),
                limit: isNaN(Number(req.query.limit)) ? 10 : Number(req.query.limit),
                paginate: req.query.paginate === "true"
            };


            const response = await MakerService.get(request);

            sendSuccess(res, 200, "Get Maker success", response.data, response.pagination);
        } catch (e) {
            next(e);
        }
    }

    static async show(req: Request, res: Response, next: NextFunction) {
        try {
            const id: number = Number(req.params.id);
            const response = await MakerService.show(id);
            sendSuccess(res, 200, "Get Maker success", response);
        } catch (e) {
            next(e);
        }
    }

    static async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const id: number = Number(req.params.id);
            await MakerService.remove(id);

            sendSuccess(res, 200, "Remove Maker success");
        } catch (e) {
            next(e);
        }
    }
}