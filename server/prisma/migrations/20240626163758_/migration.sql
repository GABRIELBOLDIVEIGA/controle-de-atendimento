-- CreateTable
CREATE TABLE `Cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `tel1` VARCHAR(191) NULL,
    `tel2` VARCHAR(191) NULL,
    `tel3` VARCHAR(191) NULL,
    `cep` VARCHAR(191) NULL,
    `logradouro` VARCHAR(191) NULL,
    `complemento` VARCHAR(191) NULL,
    `bairro` VARCHAR(191) NULL,
    `localidade` VARCHAR(191) NULL,
    `uf` VARCHAR(191) NULL,
    `numero` VARCHAR(191) NULL,
    `ativo` INTEGER NOT NULL,
    `preferencia_horario` TIME(4) NULL,
    `primeiro_contato` DATETIME(3) NULL,
    `ultimo_contato` DATETIME(3) NULL,
    `proximo_contato` DATETIME(3) NULL,
    `origem` VARCHAR(191) NULL,
    `obs` VARCHAR(191) NULL,
    `contato` VARCHAR(191) NULL,
    `concorrente` VARCHAR(191) NULL,
    `cnpj` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `empresaId` INTEGER NOT NULL,
    `usuarioId` INTEGER NOT NULL,

    UNIQUE INDEX `Cliente_cnpj_key`(`cnpj`),
    INDEX `empresaId`(`empresaId`),
    INDEX `usuarioId`(`usuarioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cliente` ADD CONSTRAINT `Cliente_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cliente` ADD CONSTRAINT `Cliente_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
