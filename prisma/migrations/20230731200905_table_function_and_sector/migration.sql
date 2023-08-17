-- AlterTable
ALTER TABLE `applicant` ADD COLUMN `sectorId` INTEGER NULL,
    ALTER COLUMN `birthDate` DROP DEFAULT;

-- CreateTable
CREATE TABLE `Sector` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name_sector` VARCHAR(191) NOT NULL,
    `note` VARCHAR(191) NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `functionId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Function` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `function` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `active` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Applicant` ADD CONSTRAINT `Applicant_sectorId_fkey` FOREIGN KEY (`sectorId`) REFERENCES `Sector`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sector` ADD CONSTRAINT `Sector_functionId_fkey` FOREIGN KEY (`functionId`) REFERENCES `Function`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
