import { Request, Response, NextFunction } from "express";
import { CreateMachineAreaRequest, UpdateMachineAreaRequest, SearchMachineAreaRequest } from "../model/machine-area-model";
import { MachineAreaService } from "../service/machine-area-service";
import { sendSuccess } from "../helper/response-helper";


export class MachineAreaController {

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateMachineAreaRequest = req.body as CreateMachineAreaRequest;
            const response = await MachineAreaService.create(request);

            sendSuccess(res, 200, "Create area success", response);

        } catch (e) {
            next(e);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id: number = Number(req.params.id);
            const request: UpdateMachineAreaRequest = req.body as UpdateMachineAreaRequest;
            const response = await MachineAreaService.update(id, request);

            sendSuccess(res, 200, "Update area success", response);
        } catch (e) {
            next(e);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {

            const request: SearchMachineAreaRequest = {
                keyword: req.query.keyword as string,
                page: isNaN(Number(req.query.page)) ? 1 : Number(req.query.page),
                limit: isNaN(Number(req.query.limit)) ? 10 : Number(req.query.limit),
                paginate: req.query.paginate === "true"
            };


            const response = await MachineAreaService.get(request);

            sendSuccess(res, 200, "Get area success", response.data, response.pagination);
        } catch (e) {
            next(e);
        }
    }

    static async show(req: Request, res: Response, next: NextFunction) {
        try {
            const id: number = Number(req.params.id);
            const response = await MachineAreaService.show(id);
            sendSuccess(res, 200, "Get area success", response);
        } catch (e) {
            next(e);
        }
    }

    static async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const id: number = Number(req.params.id);
            await MachineAreaService.remove(id);

            sendSuccess(res, 200, "Remove area success");
        } catch (e) {
            next(e);
        }
    }
}