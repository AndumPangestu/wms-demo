import { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../helper/response-helper";
import { ResetService } from "../service/reset-service";

export class ResetController {
  static async reset(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await ResetService.reset();
      sendSuccess(res, 200, "Reset success", response);
    } catch (e) {
      next(e);
    }
  }
}
