-- AlterTable
ALTER TABLE `applicant` ALTER COLUMN `birthDate` DROP DEFAULT;

-- CreateTable
CREATE TABLE `Location` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `unit` VARCHAR(191) NOT NULL,
    `note` VARCHAR(191) NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
