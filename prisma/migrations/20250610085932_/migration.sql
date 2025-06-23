-- AlterTable
ALTER TABLE `kanbans` ADD COLUMN `incoming_order_stock` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `StockOrderKanban` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kanban_code` VARCHAR(191) NOT NULL,
    `po_number` VARCHAR(191) NOT NULL,
    `last_stock` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StockOrderKanban` ADD CONSTRAINT `StockOrderKanban_kanban_code_fkey` FOREIGN KEY (`kanban_code`) REFERENCES `kanbans`(`code`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StockOrderKanban` ADD CONSTRAINT `StockOrderKanban_po_number_fkey` FOREIGN KEY (`po_number`) REFERENCES `purchase_orders`(`po_number`) ON DELETE CASCADE ON UPDATE CASCADE;
