import { Response, Request, NextFunction } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../error/response-error";
import { sendError } from "../helper/response-helper";
import { logger } from "../application/logging";
import { NODE_ENV } from "../application/config";

export const errorMiddleware = async (error: Error, req: Request, res: Response, next: NextFunction) => {



    if (error instanceof ZodError) {
        const formatted: Record<string, string[]> = {};

        for (const issue of error.issues) {
            const path = issue.path.join(".");

            if (!formatted[path]) {
                formatted[path] = [];
            }

            formatted[path].push(issue.message);
        }

        sendError(res, 422, "Validation error", formatted);
    } else if (error instanceof ResponseError) {
        sendError(res, error.status, error.message, error.errorDetails);
    } else {
        logger.error(error);
        const formatted: Record<string, string[]> = {};
        if (NODE_ENV === "development") {
            formatted["error"] = [error.message];
        }

        sendError(res, 500, "Internal server error", formatted);

    }

}
