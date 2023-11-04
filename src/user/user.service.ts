import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch.user";
import { UpdatePutUserDTO } from "./dto/update-put-user";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDTO) {
    data.senha = await bcrypt.hash(data.senha, await bcrypt.genSalt());

    return this.prisma.tb_oticas.create({
      data: {
        nome_otica: data.nome_otica,
        nome_usuario: data.nome_usuario,
        plano_ativo: data.plano_ativo,
        senha: data.senha,
        email: data.email,
        plano_id: data.plano_id, 
      },
    });
  }

  async list() {
    return this.prisma.tb_oticas.findMany();
  }

  async show(otica_id: number) {
   
    return this.prisma.tb_oticas.findUnique({
      where: {
        otica_id,
      },
    });
  }

  async update(
    otica_id: number,
    { email, nome_usuario, senha }: UpdatePutUserDTO,
  ) {
    await this.exists(otica_id);

    const salt = await bcrypt.genSalt();
    senha = await bcrypt.hash(senha, salt);

    return this.prisma.tb_oticas.update({
      data: {
        email,
        nome_usuario,
        senha,
      },
      where: {
        otica_id,
      },
    });
  }

  async updatePartial(
    otica_id: number,
    { senha, nome_usuario, email }: UpdatePatchUserDTO,
  ) {
    const data: any = {};

    await this.exists(otica_id);

    if (email) {
      data.email = email;
    }

    if (nome_usuario) {
      data.nome_usuario = nome_usuario;
    }

    if (senha) {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(senha, salt);
    }

    return this.prisma.tb_oticas.update({
      data,
      where: {
        otica_id,
      },
    });
  }

  async delete(otica_id: number) {
    await this.exists(otica_id);

    return this.prisma.tb_oticas.delete({
      where: {
        otica_id,
      },
    });
  }

  async exists(otica_id: number) {
    const count = await this.prisma.tb_oticas.count({
      where: {
        otica_id,
      },
    });

    if (count === 0) {
      throw new NotFoundException(`A ótica ${otica_id} não existe`);
    }
  }
}
