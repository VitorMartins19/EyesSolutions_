-- CreateTable
CREATE TABLE `tb_oticas` (
    `otica_id` INTEGER NOT NULL,
    `plano_id` INTEGER NOT NULL DEFAULT 1,
    `nome_otica` VARCHAR(127) NOT NULL,
    `nome_usuario` VARCHAR(127) NOT NULL,
    `plano_ativo` VARCHAR(127) NOT NULL,
    `senha` VARCHAR(127) NOT NULL,
    `email` VARCHAR(127) NOT NULL,

    PRIMARY KEY (`otica_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_pagamentos` (
    `pagamentos_id` INTEGER NOT NULL AUTO_INCREMENT,
    `plano_id` INTEGER NOT NULL,
    `otica_id` INTEGER NOT NULL,
    `user_atividade` VARCHAR(127) NOT NULL,

    PRIMARY KEY (`pagamentos_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_imagens` (
    `imagem_id` INTEGER NOT NULL AUTO_INCREMENT,
    `otica_id` INTEGER NOT NULL,
    `date_upload` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `nome_img` VARCHAR(63) NOT NULL,

    PRIMARY KEY (`imagem_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_armacao` (
    `armacao_id` INTEGER NOT NULL AUTO_INCREMENT,
    `imagem_id` INTEGER NOT NULL,
    `otica_id` INTEGER NOT NULL,
    `modelo` VARCHAR(63) NOT NULL,
    `preco` VARCHAR(63) NOT NULL,
    `formato` VARCHAR(63) NOT NULL,

    PRIMARY KEY (`armacao_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_pagamentos` ADD CONSTRAINT `tb_pagamentos_otica_id_fkey` FOREIGN KEY (`otica_id`) REFERENCES `tb_oticas`(`otica_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_imagens` ADD CONSTRAINT `tb_imagens_otica_id_fkey` FOREIGN KEY (`otica_id`) REFERENCES `tb_oticas`(`otica_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_armacao` ADD CONSTRAINT `tb_armacao_otica_id_fkey` FOREIGN KEY (`otica_id`) REFERENCES `tb_oticas`(`otica_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_armacao` ADD CONSTRAINT `tb_armacao_imagem_id_fkey` FOREIGN KEY (`imagem_id`) REFERENCES `tb_imagens`(`imagem_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
