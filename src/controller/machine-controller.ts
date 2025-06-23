import { Request, Response, NextFunction } from "express";
import { CreateMachineRequest, UpdateMachineRequest, SearchMachineRequest } from "../model/machine-model";
import { MachineService } from "../service/machine-service";
import { sendSuccess } from "../helper/response-helper";


export class MachineController {

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateMachineRequest = req.body as CreateMachineRequest;
            const response = await MachineService.create(request);

            sendSuccess(res, 200, "Create machine success", response);

        } catch (e) {
            next(e);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id: number = Number(req.params.id);
            const request: UpdateMachineRequest = req.body as UpdateMachineRequest;
            const response = await MachineService.update(id, request);

            sendSuccess(res, 200, "Update machine success", response);
        } catch (e) {
            next(e);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {

            const request: SearchMachineRequest = {
                keyword: req.query.keyword as string,
                page: isNaN(Number(req.query.page)) ? 1 : Number(req.query.page),
                limit: isNaN(Number(req.query.limit)) ? 10 : Number(req.query.limit),
                paginate: req.query.paginate === "true"
            };


            const response = await MachineService.get(request);

            sendSuccess(res, 200, "Get machine success", response.data, response.pagination);
        } catch (e) {
            next(e);
        }
    }

    static async show(req: Request, res: Response, next: NextFunction) {
        try {
            const id: number = Number(req.params.id);
            const response = await MachineService.show(id);
            sendSuccess(res, 200, "Get machine success", response);
        } catch (e) {
            next(e);
        }
    }

    static async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const id: number = Number(req.params.id);
            await MachineService.remove(id);

            sendSuccess(res, 200, "Remove machine success");
        } catch (e) {
            next(e);
        }
    }
}