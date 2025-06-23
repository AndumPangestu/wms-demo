-- AlterTable
ALTER TABLE `kanbans` MODIFY `min_quantity` INTEGER NULL,
    MODIFY `max_quantity` INTEGER NULL,
    MODIFY `lead_time` INTEGER NULL,
    MODIFY `safety_stock` INTEGER NULL,
    MODIFY `price` INTEGER NULL;
