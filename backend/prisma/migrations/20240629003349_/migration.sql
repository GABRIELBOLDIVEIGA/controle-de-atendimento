/*
  Warnings:

  - A unique constraint covering the columns `[document]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Customer_document_key" ON "Customer"("document");
