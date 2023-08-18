-- AlterTable
ALTER TABLE `applicant` ALTER COLUMN `birthDate` DROP DEFAULT;

-- CreateTable
CREATE TABLE `Interview` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date_interview` DATETIME(3) NOT NULL,
    `note` VARCHAR(191) NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `searchId` INTEGER NULL,
    `applicantId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Interview` ADD CONSTRAINT `Interview_searchId_fkey` FOREIGN KEY (`searchId`) REFERENCES `Search`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Interview` ADD CONSTRAINT `Interview_applicantId_fkey` FOREIGN KEY (`applicantId`) REFERENCES `Applicant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
