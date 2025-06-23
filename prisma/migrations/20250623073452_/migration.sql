/*
  Warnings:

  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productkanban` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stockorderkanban` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `workorder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `workorderproduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `productkanban` DROP FOREIGN KEY `ProductKanban_kanban_id_fkey`;

-- DropForeignKey
ALTER TABLE `productkanban` DROP FOREIGN KEY `ProductKanban_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `stockorderkanban` DROP FOREIGN KEY `StockOrderKanban_kanban_code_fkey`;

-- DropForeignKey
ALTER TABLE `stockorderkanban` DROP FOREIGN KEY `StockOrderKanban_po_number_fkey`;

-- DropForeignKey
ALTER TABLE `workorderproduct` DROP FOREIGN KEY `WorkOrderProduct_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `workorderproduct` DROP FOREIGN KEY `WorkOrderProduct_work_order_id_fkey`;

-- DropTable
DROP TABLE `product`;

-- DropTable
DROP TABLE `productkanban`;

-- DropTable
DROP TABLE `stockorderkanban`;

-- DropTable
DROP TABLE `workorder`;

-- DropTable
DROP TABLE `workorderproduct`;

-- CreateTable
CREATE TABLE `stock_order_kanbans` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kanban_code` VARCHAR(191) NOT NULL,
    `po_number` VARCHAR(191) NOT NULL,
    `last_stock` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `stock_order_kanbans_kanban_code_po_number_key`(`kanban_code`, `po_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `products_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_kanbans` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NOT NULL,
    `kanban_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `work_orders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `work_orders_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `work_order_products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `work_order_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `stock_order_kanbans` ADD CONSTRAINT `stock_order_kanbans_kanban_code_fkey` FOREIGN KEY (`kanban_code`) REFERENCES `kanbans`(`code`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_order_kanbans` ADD CONSTRAINT `stock_order_kanbans_po_number_fkey` FOREIGN KEY (`po_number`) REFERENCES `purchase_orders`(`po_number`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_kanbans` ADD CONSTRAINT `product_kanbans_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_kanbans` ADD CONSTRAINT `product_kanbans_kanban_id_fkey` FOREIGN KEY (`kanban_id`) REFERENCES `kanbans`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `work_order_products` ADD CONSTRAINT `work_order_products_work_order_id_fkey` FOREIGN KEY (`work_order_id`) REFERENCES `work_orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `work_order_products` ADD CONSTRAINT `work_order_products_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
