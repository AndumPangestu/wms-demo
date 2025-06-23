import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserRequest } from "../type/user-request";
import { sendError } from "../helper/response-helper";
import { JWT_SECRET_KEY } from "../application/config";

export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return sendError(res, 401, "Unauthorized: Token missing or invalid");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return sendError(res, 401, "Unauthorized: Token not provided");
  }

  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return sendError(res, 401, "Unauthorized: Invalid or expired token");
    }

    if (typeof decoded === "object" && "username" in decoded) {
      req.username = decoded.username;
      return next();
    }

    return sendError(res, 401, "Unauthorized: Invalid token payload");
  });

}
