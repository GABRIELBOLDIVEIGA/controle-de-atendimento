-- DropForeignKey
ALTER TABLE "CustomerAdress" DROP CONSTRAINT "CustomerAdress_addressId_fkey";

-- DropForeignKey
ALTER TABLE "UserAddress" DROP CONSTRAINT "UserAddress_addressId_fkey";

-- AddForeignKey
ALTER TABLE "UserAddress" ADD CONSTRAINT "UserAddress_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Adress"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerAdress" ADD CONSTRAINT "CustomerAdress_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Adress"("id") ON DELETE CASCADE ON UPDATE CASCADE;
