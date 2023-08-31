/*
  Warnings:

  - You are about to drop the column `sectorId` on the `applicant` table. All the data in the column will be lost.
  - You are about to drop the column `functionId` on the `sector` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `applicant` DROP FOREIGN KEY `Applicant_sectorId_fkey`;

-- DropForeignKey
ALTER TABLE `sector` DROP FOREIGN KEY `Sector_functionId_fkey`;

-- AlterTable
ALTER TABLE `applicant` DROP COLUMN `sectorId`,
    ADD COLUMN `functionId` INTEGER NULL,
    ALTER COLUMN `birthDate` DROP DEFAULT;

-- AlterTable
ALTER TABLE `function` ADD COLUMN `sectorId` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `sector` DROP COLUMN `functionId`;

-- AddForeignKey
ALTER TABLE `Applicant` ADD CONSTRAINT `Applicant_functionId_fkey` FOREIGN KEY (`functionId`) REFERENCES `Function`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Function` ADD CONSTRAINT `Function_sectorId_fkey` FOREIGN KEY (`sectorId`) REFERENCES `Sector`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
