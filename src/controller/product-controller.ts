import { Request, Response, NextFunction } from "express";
import { CreateProductRequest, UpdateProductRequest, SearchProductRequest } from "../model/product-model";
import { ProductService } from "../service/product-service";
import { sendSuccess } from "../helper/response-helper";


export class ProductController {

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateProductRequest = req.body as CreateProductRequest;
            const response = await ProductService.create(request);

            sendSuccess(res, 200, "Create product success", response);

        } catch (e) {
            next(e);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id: number = Number(req.params.id);
            const request: UpdateProductRequest = req.body as UpdateProductRequest;
            const response = await ProductService.update(id, request);

            sendSuccess(res, 200, "Update product success", response);
        } catch (e) {
            next(e);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {

            const request: SearchProductRequest = {
                keyword: req.query.keyword as string,
                page: isNaN(Number(req.query.page)) ? 1 : Number(req.query.page),
                limit: isNaN(Number(req.query.limit)) ? 10 : Number(req.query.limit),
                paginate: req.query.paginate === "true"
            };


            const response = await ProductService.get(request);

            sendSuccess(res, 200, "Get product success", response.data, response.pagination);
        } catch (e) {
            next(e);
        }
    }


    static async show(req: Request, res: Response, next: NextFunction) {
        try {
            const id: number = Number(req.params.id);
            const response = await ProductService.show(id);
            sendSuccess(res, 200, "Get product success", response);
        } catch (e) {
            next(e);
        }
    }

    static async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const id: number = Number(req.params.id);
            await ProductService.remove(id);

            sendSuccess(res, 200, "Remove product success");
        } catch (e) {
            next(e);
        }
    }
}