/*
  Warnings:

  - You are about to drop the column `progress` on the `applicant` table. All the data in the column will be lost.
  - You are about to drop the `process` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `process` DROP FOREIGN KEY `Process_applicantId_fkey`;

-- DropForeignKey
ALTER TABLE `process` DROP FOREIGN KEY `Process_stageId_fkey`;

-- AlterTable
ALTER TABLE `applicant` DROP COLUMN `progress`,
    ADD COLUMN `stageId` INTEGER NULL,
    ALTER COLUMN `birthDate` DROP DEFAULT;

-- DropTable
DROP TABLE `process`;

-- AddForeignKey
ALTER TABLE `Applicant` ADD CONSTRAINT `Applicant_stageId_fkey` FOREIGN KEY (`stageId`) REFERENCES `Stage`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
