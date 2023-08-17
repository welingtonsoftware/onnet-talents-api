-- AlterTable
ALTER TABLE `applicant` ADD COLUMN `locationId` INTEGER NULL,
    ALTER COLUMN `birthDate` DROP DEFAULT;

-- AddForeignKey
ALTER TABLE `Applicant` ADD CONSTRAINT `Applicant_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Location`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
