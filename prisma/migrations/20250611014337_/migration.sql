/*
  Warnings:

  - A unique constraint covering the columns `[kanban_code,po_number]` on the table `StockOrderKanban` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `StockOrderKanban_kanban_code_po_number_key` ON `StockOrderKanban`(`kanban_code`, `po_number`);
