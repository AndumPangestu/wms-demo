import { Request, Response, NextFunction } from "express";
import { MainService } from "../service/main-service";
import { sendSuccess } from "../helper/response-helper";


export class MainController {


    static async get(req: Request, res: Response, next: NextFunction) {
        try {



            const response = await MainService.get();

            sendSuccess(res, 200, "Get Main success", response);
        } catch (e) {
            next(e);
        }
    }


}