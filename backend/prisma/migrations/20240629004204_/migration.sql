/*
  Warnings:

  - A unique constraint covering the columns `[customerId,companyId]` on the table `CustomerCompany` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CustomerCompany_customerId_companyId_key" ON "CustomerCompany"("customerId", "companyId");
