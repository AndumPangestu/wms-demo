/*
  Warnings:

  - The primary key for the `work_orders` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `work_order_products` DROP FOREIGN KEY `work_order_products_work_order_id_fkey`;

-- AlterTable
ALTER TABLE `work_order_products` MODIFY `work_order_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `work_orders` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `work_order_products` ADD CONSTRAINT `work_order_products_work_order_id_fkey` FOREIGN KEY (`work_order_id`) REFERENCES `work_orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
