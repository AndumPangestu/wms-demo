import { Request, Response, NextFunction } from "express";
import { CreateKanbanRequest, UpdateKanbanRequest, SearchKanbanRequest } from "../model/kanban-model";
import { KanbanService } from "../service/kanban-service";
import { sendSuccess } from "../helper/response-helper";
import { logger } from "../application/logging";


export class KanbanController {

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateKanbanRequest = req.body as CreateKanbanRequest;
            const response = await KanbanService.createFromRequest(request);

            sendSuccess(res, 200, "Create Kanban success", response);

        } catch (e) {
            next(e);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id: number = Number(req.params.id);
            const request: UpdateKanbanRequest = req.body as UpdateKanbanRequest;
            const response = await KanbanService.update(id, request);

            sendSuccess(res, 200, "Update Kanban success", response);
        } catch (e) {
            next(e);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {

            const request: SearchKanbanRequest = {
                keyword: req.query.keyword as string,
                page: isNaN(Number(req.query.page)) ? 1 : Number(req.query.page),
                limit: isNaN(Number(req.query.limit)) ? 10 : Number(req.query.limit),
                paginate: req.query.paginate === "true",
                rack_id: isNaN(Number(req.query.rack_id)) ? undefined : Number(req.query.rack_id),
                machine_id: isNaN(Number(req.query.machine_id)) ? undefined : Number(req.query.machine_id),
                machine_area_id: isNaN(Number(req.query.machine_area_id)) ? undefined : Number(req.query.machine_area_id),
                stock_status: req.query.stock_status as string,
                completed_status: req.query.completed_status as string,
            };


            const response = await KanbanService.get(request);

            sendSuccess(res, 200, "Get Kanban success", response.data, response.pagination);
        } catch (e) {
            next(e);
        }
    }

    static async show(req: Request, res: Response, next: NextFunction) {
        try {
            const identifier = req.params.id;
            const response = await KanbanService.show(identifier);
            logger.info("Kanban is found successfully");
            sendSuccess(res, 200, "Get Kanban success", response);
        } catch (e) {
            next(e);
        }
    }

    static async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const id: number = Number(req.params.id);
            await KanbanService.remove(id);

            sendSuccess(res, 200, "Remove Kanban success");
        } catch (e) {
            next(e);
        }
    }

    static async exportUncompletedKanbanToExcel(req: Request, res: Response, next: NextFunction) {
        try {

            const response = await KanbanService.exportUncompletedKanbanToExcel();


            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            res.setHeader("Content-Disposition", "attachment; filename=UncompletedKanbanExport.xlsx");
            res.send(response);



        } catch (e) {
            next(e);
        }
    }
}