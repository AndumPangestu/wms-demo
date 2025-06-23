/*
  Warnings:

  - Added the required column `original_quantity` to the `stock_outs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `stock_outs` ADD COLUMN `original_quantity` INTEGER NOT NULL;
