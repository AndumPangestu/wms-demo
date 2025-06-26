/*
  Warnings:

  - You are about to alter the column `work_order_id` on the `work_order_products` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `work_orders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `work_orders` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `work_order_products` DROP FOREIGN KEY `work_order_products_work_order_id_fkey`;

-- AlterTable
ALTER TABLE `work_order_products` MODIFY `work_order_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `work_orders` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `work_order_products` ADD CONSTRAINT `work_order_products_work_order_id_fkey` FOREIGN KEY (`work_order_id`) REFERENCES `work_orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
