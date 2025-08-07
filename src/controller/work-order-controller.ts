import { Request, Response, NextFunction } from "express";
import {
  CreateWorkOrderRequest,
  UpdateWorkOrderRequest,
  SearchWorkOrderRequest,
} from "../model/work-order-model";
import { WorkOrderService } from "../service/work-order-service";
import { sendSuccess } from "../helper/response-helper";
import { UserRequest } from "../type/user-request";

export class WorkOrderController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.userId;
      const request: CreateWorkOrderRequest =
        req.body as CreateWorkOrderRequest;
      const response = await WorkOrderService.create(request, userId);

      sendSuccess(res, 200, "Create work order success", response);
    } catch (e) {
      next(e);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const id: number = Number(req.params.id);
      const userId = req.userId;
      const request: UpdateWorkOrderRequest =
        req.body as UpdateWorkOrderRequest;
      const response = await WorkOrderService.update(id, request, userId);

      sendSuccess(res, 200, "Update work order success", response);
    } catch (e) {
      next(e);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const request: SearchWorkOrderRequest = {
        keyword: req.query.keyword as string,
        page: isNaN(Number(req.query.page)) ? 1 : Number(req.query.page),
        limit: isNaN(Number(req.query.limit)) ? 10 : Number(req.query.limit),
        paginate: req.query.paginate === "true",
        status: req.query.status as string,
      };

      const response = await WorkOrderService.get(request);

      sendSuccess(
        res,
        200,
        "Get work order success",
        response.data,
        response.pagination
      );
    } catch (e) {
      next(e);
    }
  }

  static async show(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = Number(req.params.id);
      const response = await WorkOrderService.show(id);
      sendSuccess(res, 200, "Get work order success", response);
    } catch (e) {
      next(e);
    }
  }

  static async remove(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const id: number = Number(req.params.id);
      const userId = req.userId;
      await WorkOrderService.remove(id, userId);

      sendSuccess(res, 200, "Remove work order success");
    } catch (e) {
      next(e);
    }
  }

  static async webhookWorkOrderProcess(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await WorkOrderService.webhookWorkOrderProcess(req.body);
      sendSuccess(res, 200, "Webhook work order success", response);
    } catch (e) {
      next(e);
    }
  }

  static async startWorkOrderProcess(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id: number = Number(req.params.id);
      const userName = req.userName;
      const userId = req.userId;
      const response = await WorkOrderService.startWorkOrderProcess(
        id,
        userName as string,
        userId
      );
      sendSuccess(res, 200, "Start work order process success", response);
    } catch (e) {
      next(e);
    }
  }

  static async updateStatus(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id: number = Number(req.params.id);
      const userId = req.userId;
      const status = req.body.status;
      const response = await WorkOrderService.updateStatus(id, status, userId);
      sendSuccess(res, 200, "Update work order status success", response);
    } catch (e) {
      next(e);
    }
  }
}
