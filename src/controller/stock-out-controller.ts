import { Request, Response, NextFunction } from "express";
import { CreateStockOutRequest, SearchStockOutRequest } from "../model/stock-out-model";
import { StockOutService } from "../service/stock-out-service";
import { sendSuccess } from "../helper/response-helper";
import { logger } from "../application/logging";

export class StockOutController {

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateStockOutRequest = req.body as CreateStockOutRequest;
            const response = await StockOutService.create(request);
            logger.info("Create stockOut success");
            sendSuccess(res, 200, "Create stockOut success", response);

        } catch (e) {
            next(e);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id: number = Number(req.params.id);
            const request: CreateStockOutRequest = req.body as CreateStockOutRequest;
            const response = await StockOutService.update(id, request);
            logger.info("Update stockOut success");
            sendSuccess(res, 200, "Update stockOut success", response);
        } catch (e) {
            next(e);
        }
    }



    static async get(req: Request, res: Response, next: NextFunction) {
        try {

            const request: SearchStockOutRequest = {
                keyword: req.query.keyword as string,
                page: isNaN(Number(req.query.page)) ? 1 : Number(req.query.page),
                limit: isNaN(Number(req.query.limit)) ? 10 : Number(req.query.limit),
                paginate: req.query.paginate === "true",
                start_date: typeof req.query.start_date === 'string' ? new Date(req.query.start_date) : undefined,
                end_date: typeof req.query.end_date === 'string' ? new Date(req.query.end_date) : undefined,
                machine_id: isNaN(Number(req.query.machine_id)) ? undefined : Number(req.query.machine_id),
                machine_area_id: isNaN(Number(req.query.machine_area_id)) ? undefined : Number(req.query.machine_area_id),
            };




            const response = await StockOutService.get(request);


            sendSuccess(res, 200, "Get stockOut success", response.data, response.pagination);
        } catch (e) {
            next(e);
        }
    }

    static async show(req: Request, res: Response, next: NextFunction) {
        try {
            const id: number = Number(req.params.id);
            const response = await StockOutService.show(id);
            sendSuccess(res, 200, "Get stockOut success", response);
        } catch (e) {
            next(e);
        }
    }

    static async exportExcel(req: Request, res: Response, next: NextFunction) {
        try {
            const request: SearchStockOutRequest = {
                keyword: req.query.keyword as string,
                page: isNaN(Number(req.query.page)) ? 1 : Number(req.query.page),
                limit: isNaN(Number(req.query.limit)) ? 10 : Number(req.query.limit),
                paginate: req.query.paginate === "true",
                start_date: typeof req.query.start_date === 'string' ? new Date(req.query.start_date) : undefined,
                end_date: typeof req.query.end_date === 'string' ? new Date(req.query.end_date) : undefined,
                machine_id: isNaN(Number(req.query.machine_id)) ? undefined : Number(req.query.machine_id),
                machine_area_id: isNaN(Number(req.query.machine_area_id)) ? undefined : Number(req.query.machine_area_id),
            };


            const response = await StockOutService.exportExcel(request);

            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            res.setHeader("Content-Disposition", "attachment; filename=StockOutExport.xlsx");
            res.send(response);



        } catch (e) {
            next(e);
        }
    }


}