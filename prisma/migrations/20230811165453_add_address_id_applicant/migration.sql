-- AlterTable
ALTER TABLE `applicant` ADD COLUMN `addressId` INTEGER NULL,
    ALTER COLUMN `birthDate` DROP DEFAULT;

-- AddForeignKey
ALTER TABLE `Applicant` ADD CONSTRAINT `Applicant_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
