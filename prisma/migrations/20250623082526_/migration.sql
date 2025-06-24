-- DropForeignKey
ALTER TABLE `stock_ins` DROP FOREIGN KEY `stock_ins_operator_id_fkey`;

-- DropForeignKey
ALTER TABLE `stock_outs` DROP FOREIGN KEY `stock_outs_operator_id_fkey`;

-- AlterTable
ALTER TABLE `work_orders` ADD COLUMN `pic_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `stock_ins` ADD CONSTRAINT `stock_ins_operator_id_fkey` FOREIGN KEY (`operator_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_outs` ADD CONSTRAINT `stock_outs_operator_id_fkey` FOREIGN KEY (`operator_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `work_orders` ADD CONSTRAINT `work_orders_pic_id_fkey` FOREIGN KEY (`pic_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
