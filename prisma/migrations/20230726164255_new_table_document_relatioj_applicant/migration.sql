-- AlterTable
ALTER TABLE `applicant` ALTER COLUMN `birthDate` DROP DEFAULT;

-- CreateTable
CREATE TABLE `Document` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` INTEGER NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `applicantId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Document` ADD CONSTRAINT `Document_applicantId_fkey` FOREIGN KEY (`applicantId`) REFERENCES `Applicant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
