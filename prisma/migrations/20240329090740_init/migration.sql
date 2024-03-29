/*
  Warnings:

  - Made the column `petOwnershipExperience` on table `AdoptionRequest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `temperament` on table `Pet` required. This step will fail if there are existing NULL values in that column.
  - Made the column `medicalHistory` on table `Pet` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "AdoptionRequest" ALTER COLUMN "petOwnershipExperience" SET NOT NULL;

-- AlterTable
ALTER TABLE "Pet" ALTER COLUMN "temperament" SET NOT NULL,
ALTER COLUMN "medicalHistory" SET NOT NULL;
