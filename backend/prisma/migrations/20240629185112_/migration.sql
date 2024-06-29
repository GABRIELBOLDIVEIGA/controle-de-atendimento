/*
  Warnings:

  - A unique constraint covering the columns `[customerId]` on the table `CustomerUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CustomerUser_customerId_key" ON "CustomerUser"("customerId");
