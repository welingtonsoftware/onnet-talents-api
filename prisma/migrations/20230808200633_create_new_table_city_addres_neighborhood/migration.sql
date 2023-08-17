-- AlterTable
ALTER TABLE `applicant` ALTER COLUMN `birthDate` DROP DEFAULT;

-- CreateTable
CREATE TABLE `Address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `addres_name` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(191) NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `neighborhoodId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Neighborhood` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `neighbohood_name` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `cityId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `City` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `city_name` VARCHAR(191) NOT NULL,
    `ibge` VARCHAR(191) NOT NULL,
    `uf` CHAR(2) NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_neighborhoodId_fkey` FOREIGN KEY (`neighborhoodId`) REFERENCES `Neighborhood`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Neighborhood` ADD CONSTRAINT `Neighborhood_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
