-- AlterTable
ALTER TABLE `applicant` ALTER COLUMN `birthDate` DROP DEFAULT;

-- AlterTable
ALTER TABLE `stage` ADD COLUMN `value` VARCHAR(191) NULL;
