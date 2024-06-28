-- AddForeignKey
ALTER TABLE `Ocorrencia` ADD CONSTRAINT `Ocorrencia_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
