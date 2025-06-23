-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `machine_areas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `machine_areas_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `operators` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nik` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `operators_nik_key`(`nik`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `racks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `racks_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `suppliers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `suppliers_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `makers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `makers_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `purchase_requests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NULL,
    `pr_number` VARCHAR(191) NULL,
    `department` VARCHAR(191) NULL,
    `budget_number` VARCHAR(191) NULL,
    `fixed_asset_number` VARCHAR(191) NULL,
    `type` VARCHAR(191) NULL,
    `transportation` VARCHAR(191) NULL,
    `kind_of_request` VARCHAR(191) NULL,
    `requested` VARCHAR(191) NULL,
    `gen_manager` VARCHAR(191) NULL,
    `supervisor` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `purchase_requests_pr_number_key`(`pr_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `purchase_request_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pr_number` VARCHAR(191) NULL,
    `acc` VARCHAR(191) NULL,
    `kanban_code` VARCHAR(191) NULL,
    `item_name` VARCHAR(191) NULL,
    `description_of_goods` VARCHAR(191) NULL,
    `specification` VARCHAR(191) NULL,
    `part` VARCHAR(191) NULL,
    `quantity` INTEGER NULL,
    `unit` VARCHAR(191) NULL,
    `est_unit_price` DOUBLE NULL,
    `est_amount` DOUBLE NULL,
    `currency` VARCHAR(191) NULL,
    `req_delivery` DATETIME(3) NULL,
    `supplier` VARCHAR(191) NULL,
    `remark` VARCHAR(191) NULL,
    `purpose` VARCHAR(191) NULL,
    `is_active` BOOLEAN NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `purchase_orders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `department` VARCHAR(191) NULL,
    `supplier_id` INTEGER NULL,
    `po_number` VARCHAR(191) NOT NULL,
    `po_date` DATETIME(3) NULL,
    `pr_date` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `purchase_orders_po_number_key`(`po_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `purchase_order_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `po_number` VARCHAR(191) NOT NULL,
    `pr_number` VARCHAR(191) NULL,
    `pr_requested` VARCHAR(191) NULL,
    `kanban_code` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `specification` VARCHAR(191) NULL,
    `quantity` INTEGER NULL,
    `unit` VARCHAR(191) NULL,
    `remark` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL,
    `is_active` BOOLEAN NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `machines` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `machines_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kanbans` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(100) NOT NULL,
    `description` VARCHAR(255) NULL,
    `specification` VARCHAR(255) NULL,
    `min_quantity` INTEGER NOT NULL DEFAULT 0,
    `max_quantity` INTEGER NOT NULL DEFAULT 0,
    `uom` VARCHAR(10) NULL,
    `lead_time` INTEGER NOT NULL DEFAULT 0,
    `rack_id` INTEGER NULL,
    `machine_area_id` INTEGER NULL,
    `machine_id` INTEGER NULL,
    `stock_in_quantity` INTEGER NOT NULL DEFAULT 0,
    `balance` INTEGER NOT NULL DEFAULT 0,
    `js_ending_quantity` INTEGER NOT NULL DEFAULT 0,
    `safety_stock` INTEGER NOT NULL DEFAULT 0,
    `currency` VARCHAR(10) NULL,
    `price` INTEGER NOT NULL DEFAULT 0,
    `rank` VARCHAR(5) NULL,
    `order_point` INTEGER NULL,
    `maker_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `kanbans_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stock_ins` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kanban_code` VARCHAR(191) NULL,
    `operator_id` INTEGER NULL,
    `quantity` INTEGER NOT NULL,
    `balance_before` INTEGER NOT NULL,
    `balance_after` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stock_outs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kanban_code` VARCHAR(191) NULL,
    `operator_id` INTEGER NULL,
    `machine_id` INTEGER NULL,
    `machine_area_id` INTEGER NULL,
    `quantity` INTEGER NOT NULL,
    `balance_before` INTEGER NOT NULL,
    `balance_after` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `receiving_reports` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kanban_code` VARCHAR(191) NULL,
    `received_quantity` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `processed_files` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `file_name` VARCHAR(100) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `processed_files_file_name_key`(`file_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_KanbanToSupplier` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_KanbanToSupplier_AB_unique`(`A`, `B`),
    INDEX `_KanbanToSupplier_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `purchase_request_details` ADD CONSTRAINT `purchase_request_details_pr_number_fkey` FOREIGN KEY (`pr_number`) REFERENCES `purchase_requests`(`pr_number`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchase_request_details` ADD CONSTRAINT `purchase_request_details_kanban_code_fkey` FOREIGN KEY (`kanban_code`) REFERENCES `kanbans`(`code`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchase_orders` ADD CONSTRAINT `purchase_orders_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchase_order_details` ADD CONSTRAINT `purchase_order_details_po_number_fkey` FOREIGN KEY (`po_number`) REFERENCES `purchase_orders`(`po_number`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchase_order_details` ADD CONSTRAINT `purchase_order_details_kanban_code_fkey` FOREIGN KEY (`kanban_code`) REFERENCES `kanbans`(`code`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kanbans` ADD CONSTRAINT `kanbans_rack_id_fkey` FOREIGN KEY (`rack_id`) REFERENCES `racks`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kanbans` ADD CONSTRAINT `kanbans_machine_area_id_fkey` FOREIGN KEY (`machine_area_id`) REFERENCES `machine_areas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kanbans` ADD CONSTRAINT `kanbans_machine_id_fkey` FOREIGN KEY (`machine_id`) REFERENCES `machines`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kanbans` ADD CONSTRAINT `kanbans_maker_id_fkey` FOREIGN KEY (`maker_id`) REFERENCES `makers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_ins` ADD CONSTRAINT `stock_ins_kanban_code_fkey` FOREIGN KEY (`kanban_code`) REFERENCES `kanbans`(`code`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_ins` ADD CONSTRAINT `stock_ins_operator_id_fkey` FOREIGN KEY (`operator_id`) REFERENCES `operators`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_outs` ADD CONSTRAINT `stock_outs_kanban_code_fkey` FOREIGN KEY (`kanban_code`) REFERENCES `kanbans`(`code`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_outs` ADD CONSTRAINT `stock_outs_operator_id_fkey` FOREIGN KEY (`operator_id`) REFERENCES `operators`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_outs` ADD CONSTRAINT `stock_outs_machine_id_fkey` FOREIGN KEY (`machine_id`) REFERENCES `machines`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_outs` ADD CONSTRAINT `stock_outs_machine_area_id_fkey` FOREIGN KEY (`machine_area_id`) REFERENCES `machine_areas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `receiving_reports` ADD CONSTRAINT `receiving_reports_kanban_code_fkey` FOREIGN KEY (`kanban_code`) REFERENCES `kanbans`(`code`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_KanbanToSupplier` ADD CONSTRAINT `_KanbanToSupplier_A_fkey` FOREIGN KEY (`A`) REFERENCES `kanbans`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_KanbanToSupplier` ADD CONSTRAINT `_KanbanToSupplier_B_fkey` FOREIGN KEY (`B`) REFERENCES `suppliers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
