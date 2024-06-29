/*
  Warnings:

  - You are about to drop the column `companyId` on the `Adress` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Adress" DROP CONSTRAINT "Adress_companyId_fkey";

-- AlterTable
ALTER TABLE "Adress" DROP COLUMN "companyId";
