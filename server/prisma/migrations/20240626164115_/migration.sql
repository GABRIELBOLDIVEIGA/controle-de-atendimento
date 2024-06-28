-- CreateTable
CREATE TABLE `Atendimento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `observacoes` VARCHAR(191) NULL,
    `inicio` DATETIME(3) NOT NULL,
    `fim` DATETIME(3) NOT NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `empresaId` INTEGER NOT NULL,
    `usuarioId` INTEGER NOT NULL,
    `ocorrenciaId` INTEGER NOT NULL,
    `clienteId` INTEGER NOT NULL,

    INDEX `clienteId`(`clienteId`),
    INDEX `ocorrenciaId`(`ocorrenciaId`),
    INDEX `empresaId`(`empresaId`),
    INDEX `usuarioId`(`usuarioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Atendimento` ADD CONSTRAINT `Atendimento_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Atendimento` ADD CONSTRAINT `Atendimento_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Atendimento` ADD CONSTRAINT `Atendimento_ocorrenciaId_fkey` FOREIGN KEY (`ocorrenciaId`) REFERENCES `Ocorrencia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Atendimento` ADD CONSTRAINT `Atendimento_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
