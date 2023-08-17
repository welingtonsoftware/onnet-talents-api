/*
  Warnings:

  - You are about to drop the column `neighbohood_name` on the `neighborhood` table. All the data in the column will be lost.
  - Added the required column `neighborhood_name` to the `Neighborhood` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `applicant` ALTER COLUMN `birthDate` DROP DEFAULT;

-- AlterTable
ALTER TABLE `neighborhood` DROP COLUMN `neighbohood_name`,
    ADD COLUMN `neighborhood_name` VARCHAR(191) NOT NULL;
