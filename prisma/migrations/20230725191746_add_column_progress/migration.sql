/*
  Warnings:

  - Added the required column `progress` to the `Applicant` table without a default value. This is not possible if the table is not empty.
  - Made the column `cpf` on table `applicant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `applicant` ADD COLUMN `progress` INTEGER NOT NULL,
    ALTER COLUMN `birthDate` DROP DEFAULT,
    MODIFY `cpf` VARCHAR(191) NOT NULL;
