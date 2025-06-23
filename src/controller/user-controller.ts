import { Request, Response, NextFunction } from "express";
import { LoginUserRequest, UpdateUserRequest } from "../model/user-model";
import { UserService } from "../service/user-service";
import { UserRequest } from "../type/user-request";
import { sendSuccess } from "../helper/response-helper";

export class UserController {

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request: LoginUserRequest = req.body as LoginUserRequest;
            const response = await UserService.login(request);
            sendSuccess(res, 200, "Login success", response);
        } catch (e) {
            next(e);
        }
    }

    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await UserService.get(req.username!);
            sendSuccess(res, 200, "Get current user success", response);

        } catch (e) {
            next(e);
        }
    }

    // static async update(req: UserRequest, res: Response, next: NextFunction) {
    //     try {
    //         const request: UpdateUserRequest = req.body as UpdateUserRequest;
    //         const response = await UserService.update(req.user!, request);
    //         res.status(200).json({
    //             data: response
    //         })
    //     } catch (e) {
    //         next(e);
    //     }
    // }


}
