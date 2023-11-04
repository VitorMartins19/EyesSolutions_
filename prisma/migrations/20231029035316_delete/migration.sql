-- DropForeignKey
ALTER TABLE `tb_pagamentos` DROP FOREIGN KEY `tb_pagamentos_otica_id_fkey`;

-- AddForeignKey
ALTER TABLE `tb_pagamentos` ADD CONSTRAINT `tb_pagamentos_otica_id_fkey` FOREIGN KEY (`otica_id`) REFERENCES `tb_oticas`(`otica_id`) ON DELETE CASCADE ON UPDATE CASCADE;
