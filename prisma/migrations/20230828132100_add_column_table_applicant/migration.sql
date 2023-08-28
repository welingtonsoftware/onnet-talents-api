-- AlterTable
ALTER TABLE `applicant` ADD COLUMN `complement` VARCHAR(191) NULL,
    ADD COLUMN `number` VARCHAR(191) NULL,
    ALTER COLUMN `birthDate` DROP DEFAULT;
