import { Request, Response, NextFunction } from "express";
import { SearchReminderRequest } from "../model/reminder-model";
import { ReminderService } from "../service/reminder-service";
import { sendSuccess } from "../helper/response-helper";


export class ReminderController {



    static async get(req: Request, res: Response, next: NextFunction) {
        try {

            const request: SearchReminderRequest = {
                keyword: req.query.keyword as string,
                page: isNaN(Number(req.query.page)) ? 1 : Number(req.query.page),
                limit: isNaN(Number(req.query.limit)) ? 10 : Number(req.query.limit),
                paginate: req.query.paginate === "true"
            };


            const response = await ReminderService.get(request);

            sendSuccess(res, 200, "Get reminder success", response.data, response.pagination);
        } catch (e) {
            next(e);
        }
    }

}