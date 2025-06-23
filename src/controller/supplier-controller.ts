import { Request, Response, NextFunction } from "express";
import { CreateSupplierRequest, UpdateSupplierRequest, SearchSupplierRequest } from "../model/supplier-model";
import { SupplierService } from "../service/supplier-service";
import { sendSuccess } from "../helper/response-helper";


export class SupplierController {

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateSupplierRequest = req.body as CreateSupplierRequest;
            const response = await SupplierService.create(request);

            sendSuccess(res, 200, "Create Supplier success", response);

        } catch (e) {
            next(e);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id: number = Number(req.params.id);
            const request: UpdateSupplierRequest = req.body as UpdateSupplierRequest;
            const response = await SupplierService.update(id, request);

            sendSuccess(res, 200, "Update Supplier success", response);
        } catch (e) {
            next(e);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {

            const request: SearchSupplierRequest = {
                keyword: req.query.keyword as string,
                page: isNaN(Number(req.query.page)) ? 1 : Number(req.query.page),
                limit: isNaN(Number(req.query.limit)) ? 10 : Number(req.query.limit),
                paginate: req.query.paginate === "true"
            };


            const response = await SupplierService.get(request);

            sendSuccess(res, 200, "Get Supplier success", response.data, response.pagination);
        } catch (e) {
            next(e);
        }
    }

    static async show(req: Request, res: Response, next: NextFunction) {
        try {
            const id: number = Number(req.params.id);
            const response = await SupplierService.show(id);
            sendSuccess(res, 200, "Get Supplier success", response);
        } catch (e) {
            next(e);
        }
    }

    static async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const id: number = Number(req.params.id);
            await SupplierService.remove(id);

            sendSuccess(res, 200, "Remove Supplier success");
        } catch (e) {
            next(e);
        }
    }
}