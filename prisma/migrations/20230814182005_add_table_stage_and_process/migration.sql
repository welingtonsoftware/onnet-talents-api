-- AlterTable
ALTER TABLE `applicant` ALTER COLUMN `birthDate` DROP DEFAULT;

-- CreateTable
CREATE TABLE `Stage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `stage` VARCHAR(250) NOT NULL,
    `note` VARCHAR(191) NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `active` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Process` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date_process` DATETIME(3) NOT NULL,
    `note` VARCHAR(191) NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `active` BOOLEAN NOT NULL,
    `stageId` INTEGER NOT NULL,
    `applicantId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Process` ADD CONSTRAINT `Process_stageId_fkey` FOREIGN KEY (`stageId`) REFERENCES `Stage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Process` ADD CONSTRAINT `Process_applicantId_fkey` FOREIGN KEY (`applicantId`) REFERENCES `Applicant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
