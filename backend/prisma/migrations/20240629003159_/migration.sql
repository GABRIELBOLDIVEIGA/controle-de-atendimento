/*
  Warnings:

  - You are about to drop the `OccurrenceCompany` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OtherOccurrenceCompany` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OccurrenceCompany" DROP CONSTRAINT "OccurrenceCompany_companyId_fkey";

-- DropForeignKey
ALTER TABLE "OccurrenceCompany" DROP CONSTRAINT "OccurrenceCompany_occurrenceId_fkey";

-- DropForeignKey
ALTER TABLE "OtherOccurrenceCompany" DROP CONSTRAINT "OtherOccurrenceCompany_companyId_fkey";

-- DropForeignKey
ALTER TABLE "OtherOccurrenceCompany" DROP CONSTRAINT "OtherOccurrenceCompany_otherOccurrenceId_fkey";

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "document" TEXT;

-- DropTable
DROP TABLE "OccurrenceCompany";

-- DropTable
DROP TABLE "OtherOccurrenceCompany";
