-- CreateTable
CREATE TABLE "OccurrenceCompany" (
    "id" SERIAL NOT NULL,
    "occurrenceId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "OccurrenceCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OtherOccurrenceCompany" (
    "id" SERIAL NOT NULL,
    "otherOccurrenceId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "OtherOccurrenceCompany_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OccurrenceCompany" ADD CONSTRAINT "OccurrenceCompany_occurrenceId_fkey" FOREIGN KEY ("occurrenceId") REFERENCES "Occurrence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OccurrenceCompany" ADD CONSTRAINT "OccurrenceCompany_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OtherOccurrenceCompany" ADD CONSTRAINT "OtherOccurrenceCompany_otherOccurrenceId_fkey" FOREIGN KEY ("otherOccurrenceId") REFERENCES "OtherOccurrence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OtherOccurrenceCompany" ADD CONSTRAINT "OtherOccurrenceCompany_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
