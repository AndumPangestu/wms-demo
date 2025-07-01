import { WorkOrderProcessRequest, Product } from './../model/work-order-model';
import { WebhookRequest } from '../model/webhook-model';
import { prismaClient } from "../application/database";
import { logger } from "../application/logging";
import { ResponseError } from "../error/response-error";
import { LampService } from './lamp-service';
import { sendNotification } from "../application/websocket";

type QueueItem = {
    code: string;
    products: Product[];
    currentProductIndex: number;
    currentKanbanIndex: number;
    color: string;
};

const WS_URL = "ws://localhost:3001";

export class WorkOrderProcessService {
    private static _instance: WorkOrderProcessService;
    static get instance() {
        return this._instance ??= new WorkOrderProcessService();
    }

    private processingQueue = new Map<string, QueueItem>();
    private activeDevice = new Map<number, string>();
    private colors = ["yellow", "blue", "magenta", "cyan", "white", "amber", "rose", "orange",];

    private constructor() { }

    async startProcessingWorkOrder(req: WorkOrderProcessRequest) {
        if (this.processingQueue.has(req.code)) {
            throw new ResponseError(400, "Work order already processing");
        };

        if (req.products.length === 0) {
            throw new ResponseError(400, "Products is empty");
        };

        if (this.colors.length === 0) {
            throw new ResponseError(400, "Processing queue is full");
        }

        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.colors.splice(this.colors.indexOf(color), 1);

        this.processingQueue.set(req.code, {
            code: req.code,
            products: req.products,
            currentProductIndex: 0,
            currentKanbanIndex: 0,
            color: color
        });


        await prismaClient.workOrder.update({
            where: {
                code: req.code
            },
            data: {
                status: "processing"
            }
        })


        // kick-off pertama
        return this.processWorkOrder(req.code);
    }

    private async processWorkOrder(code: string): Promise<void> {

        const wo = this.processingQueue.get(code);
        if (!wo) return;

        // selesai
        if (wo.currentProductIndex >= wo.products.length) {
            this.colors.push(wo.color);
            this.processingQueue.delete(code);
            await prismaClient.workOrder.update({
                where: {
                    code: code
                },
                data: {
                    status: "finished"
                }
            })
            sendNotification(code, { status: "finished" });
            return;
        }

        const product = wo.products[wo.currentProductIndex];
        if (!product || product.product_kanbans.length === 0) {
            wo.currentProductIndex++;
            wo.currentKanbanIndex = 0;
            return this.processWorkOrder(code);
        }

        const kanban = product.product_kanbans[wo.currentKanbanIndex];

        if (!kanban.kanban_rack_device_id) {
            console.log("Kanban rack device ID is null");
            return;
        }

        // device sedang dipakai oleh WO lain
        if (this.activeDevice.has(kanban.kanban_rack_device_id) &&
            this.activeDevice.get(kanban.kanban_rack_device_id) !== code) {
            console.log("Device already in use. waiting...");
            await new Promise(resolve => setTimeout(resolve, 2000));
            return this.processWorkOrder(code);
        }

        // book device LEBIH DULU
        this.activeDevice.set(kanban.kanban_rack_device_id, code);

        try {
            await LampService.turnOnLamp(kanban.kanban_rack_device_id, wo.color);

        } catch (e) {
            console.error(`Turn-on failed: ${e}`);
            this.activeDevice.delete(kanban.kanban_rack_device_id);
            return;
        }

        sendNotification(wo.code, { productName: product.name, kanbanDescription: kanban.kanban_description, totalQuantity: kanban.total_quantity });

        // advance index
        if (++wo.currentKanbanIndex >= product.product_kanbans.length) {
            wo.currentProductIndex++;
            wo.currentKanbanIndex = 0;
        }
    }

    async webhookWorkOrderProcess(req: WebhookRequest) {
        console.log("Webhook Work Order Process");
        const deviceId = req.sliD_Activated;
        const code = this.activeDevice.get(deviceId);
        if (!code) {
            console.log("Device not found");
            return
        };

        try {
            await LampService.turnOffLamp(deviceId);
        } finally {
            this.activeDevice.delete(deviceId);
            return this.processWorkOrder(code);
        }
    }
}

// pakai:
export const workOrderProcessService = WorkOrderProcessService.instance;
