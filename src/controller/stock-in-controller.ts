import { Request, Response, NextFunction } from "express";
import { CreateStockInRequest, SearchStockInRequest } from "../model/stock-in-model";
import { StockInService } from "../service/stock-in-service";
import { sendSuccess } from "../helper/response-helper";
import { logger } from "../application/logging";


export class StockInController {

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateStockInRequest = req.body as CreateStockInRequest;
            const response = await StockInService.create(request);

            logger.info("Create stockIn success");
            sendSuccess(res, 200, "Create stockIn success", response);
        } catch (e) {
            next(e);
        }
    }



    static async get(req: Request, res: Response, next: NextFunction) {
        try {

            const request: SearchStockInRequest = {
                keyword: req.query.keyword as string,
                page: isNaN(Number(req.query.page)) ? 1 : Number(req.query.page),
                limit: isNaN(Number(req.query.limit)) ? 10 : Number(req.query.limit),
                paginate: req.query.paginate === "true",
                start_date: typeof req.query.start_date === 'string' ? new Date(req.query.start_date) : undefined,
                end_date: typeof req.query.end_date === 'string' ? new Date(req.query.end_date) : undefined,
            };


            const response = await StockInService.get(request);

            sendSuccess(res, 200, "Get stockIn success", response.data, response.pagination);
        } catch (e) {
            next(e);
        }
    }

    static async show(req: Request, res: Response, next: NextFunction) {
        try {
            const id: number = Number(req.params.id);
            const response = await StockInService.show(id);
            sendSuccess(res, 200, "Get stockIn success", response);
        } catch (e) {
            next(e);
        }
    }


    static async exportExcel(req: Request, res: Response, next: NextFunction) {
        try {
            const request: SearchStockInRequest = {
                keyword: req.query.keyword as string,
                page: isNaN(Number(req.query.page)) ? 1 : Number(req.query.page),
                limit: isNaN(Number(req.query.limit)) ? 10 : Number(req.query.limit),
                paginate: req.query.paginate === "true",
                start_date: typeof req.query.start_date === 'string' ? new Date(req.query.start_date) : undefined,
                end_date: typeof req.query.end_date === 'string' ? new Date(req.query.end_date) : undefined,
            };


            const response = await StockInService.exportExcel(request);

            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            res.setHeader("Content-Disposition", "attachment; filename=StockInExport.xlsx");
            res.send(response);

        } catch (e) {
            next(e);
        }
    }


}