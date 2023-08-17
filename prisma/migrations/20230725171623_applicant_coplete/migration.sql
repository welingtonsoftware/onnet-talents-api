/*
  Warnings:

  - Added the required column `employmentStatus` to the `Applicant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `note` to the `Applicant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rg` to the `Applicant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schooling` to the `Applicant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sexo` to the `Applicant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `applicant` ADD COLUMN `birthDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `cpf` VARCHAR(191) NULL,
    ADD COLUMN `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `employmentStatus` INTEGER NOT NULL,
    ADD COLUMN `note` VARCHAR(191) NOT NULL,
    ADD COLUMN `rg` VARCHAR(191) NOT NULL,
    ADD COLUMN `schooling` INTEGER NOT NULL,
    ADD COLUMN `sexo` VARCHAR(191) NOT NULL;
