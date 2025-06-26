import express from "express";
import { UserController } from "../controller/user-controller";
import { StockInController } from "../controller/stock-in-controller";
import { StockOutController } from "../controller/stock-out-controller";
import { KanbanController } from "../controller/kanban-controller";
import { MachineAreaController } from "../controller/machine-area-controller";
import { MachineController } from './../controller/machine-controller';
import { OperatorController } from "../controller/operator-controller";
import { RackController } from "../controller/rack-controller";
import { SupplierController } from "../controller/supplier-controller";
import { MakerController } from "../controller/Maker-controller";
import { PurchaseRequestController } from "../controller/purchase-request-controller";
import { PurchaseOrderController } from "../controller/purchase-order-controller";
import { ReminderController } from "../controller/reminder-controller";
import { MainController } from "../controller/main-controller";
import { ProductController } from '../controller/product-controller';
import { WorkOrderController } from "../controller/work-order-controller";

export const publicRouter = express.Router();
publicRouter.post("/api/auth/login", UserController.login);

// Main
publicRouter.get("/api/statistics", MainController.get);

// Stock In
publicRouter.get("/api/stock-ins", StockInController.get);
publicRouter.get("/api/stock-ins/:id", StockInController.show);
publicRouter.get("/api/stock-ins/export/excel", StockInController.exportExcel);

// Work Order
publicRouter.get("/api/work-orders", WorkOrderController.get);
publicRouter.get("/api/work-orders/:id", WorkOrderController.show);
publicRouter.post("/api/work-orders/webhook", WorkOrderController.webhookWorkOrderProcess);

// Stock Out
publicRouter.get("/api/stock-outs", StockOutController.get);
publicRouter.get("/api/stock-outs/:id", StockOutController.show);
publicRouter.get("/api/stock-outs/export/excel", StockOutController.exportExcel);

// Kanban
publicRouter.get("/api/kanbans", KanbanController.get);
publicRouter.get("/api/kanbans/:id", KanbanController.show);

// Machine Area
publicRouter.get("/api/machine-areas", MachineAreaController.get);
publicRouter.get("/api/machine-areas/:id", MachineAreaController.show);

// Machine
publicRouter.get("/api/machines", MachineController.get);
publicRouter.get("/api/machines/:id", MachineController.show);


// Operator
publicRouter.get("/api/operators", OperatorController.get);
publicRouter.get("/api/operators/:id", OperatorController.show);

// Product
publicRouter.get("/api/products", ProductController.get);
publicRouter.get("/api/products/:id", ProductController.show);


// Rack
publicRouter.get("/api/racks", RackController.get);
publicRouter.get("/api/racks/:id", RackController.show);


// Supplier
publicRouter.get("/api/suppliers", SupplierController.get);
publicRouter.get("/api/suppliers/:id", SupplierController.show);

// Maker
publicRouter.get("/api/makers", MakerController.get);
publicRouter.get("/api/makers/:id", MakerController.show);


// Purchase Request
publicRouter.get("/api/purchase-requests", PurchaseRequestController.get);
publicRouter.get("/api/purchase-requests/:id", PurchaseRequestController.show);


// Purchase Order
publicRouter.get("/api/purchase-orders", PurchaseOrderController.get);
publicRouter.get("/api/purchase-orders/:id", PurchaseOrderController.show);


// Reminder
publicRouter.get("/api/reminders", ReminderController.get);