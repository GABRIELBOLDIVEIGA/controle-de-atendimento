-- AlterTable
ALTER TABLE "Adress" ADD COLUMN     "companyId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Adress" ADD CONSTRAINT "Adress_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
