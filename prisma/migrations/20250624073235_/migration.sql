/*
  Warnings:

  - You are about to drop the column `pic_id` on the `work_orders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `work_orders` DROP FOREIGN KEY `work_orders_pic_id_fkey`;

-- AlterTable
ALTER TABLE `work_orders` DROP COLUMN `pic_id`,
    ADD COLUMN `ppic_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `work_orders` ADD CONSTRAINT `work_orders_ppic_id_fkey` FOREIGN KEY (`ppic_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
