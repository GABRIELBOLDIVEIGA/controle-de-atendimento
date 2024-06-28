-- CreateTable
CREATE TABLE `Ocorrencia2` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `empresaId` INTEGER NOT NULL,

    UNIQUE INDEX `Ocorrencia2_nome_key`(`nome`),
    INDEX `empresaId`(`empresaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ocorrencia2` ADD CONSTRAINT `Ocorrencia2_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
