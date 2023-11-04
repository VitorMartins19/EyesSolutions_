import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePayDTO } from './dto/create-pay.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePutPayDTO } from 'src/payments/dto/update-put-pay';

@Injectable()
export class PayService {
  constructor(private readonly prisma: PrismaService) {}

  /*async create(data: CreatePayDTO) {
    const createdPayment = await this.prisma.tb_pagamentos.create({
      data,
    });

    await this.prisma.tb_oticas.update({
      where: {
        otica_id: createdPayment.otica_id,
      },
      data: {
        plano_id: createdPayment.plano_id
      }
    })

   

    return createdPayment;
  }*/

  async list() {
    return this.prisma.tb_pagamentos.findMany();
  }

  async show(pagamentos_id: number) {
    return this.prisma.tb_pagamentos.findUnique({
      where: {
        pagamentos_id,
      },
    });
  }

  async update(pagamentos_id: number, data: UpdatePutPayDTO) {
    const existingPayment = await this.prisma.tb_pagamentos.findUnique({
      where: {
        pagamentos_id,
      },
    });

    if (!existingPayment) {
      throw new NotFoundException(`O pagamento ${pagamentos_id} não existe.`);
    }

    const updatedPayment = await this.prisma.tb_pagamentos.update({
      data,
      where: {
        pagamentos_id,
      },
    });

    await this.updatePlanoIdInOtica(updatedPayment.otica_id, updatedPayment.plano_id);

    return updatedPayment;
  }

  async updatePartial(pagamentos_id: number, data: UpdatePutPayDTO) {
    // Implement this function as needed
  }

  async delete(pagamentos_id: number) {
    // Implement this function as needed
  }

  async ExceptionUid(pagamentos_id: number) {
    // Implement this function as needed
  }

  private async updatePlanoIdInOtica(oticaId: number, planoId: number) {
    await this.prisma.tb_oticas.update({
      where: {
        otica_id: oticaId,
      },
      data: {
        plano_id: planoId,
      },
    });
  }
}
