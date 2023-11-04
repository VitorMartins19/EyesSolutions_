import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { tb_oticas } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/user/user.service";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import * as bcrypt from "bcrypt";
import { MailerService } from "@nestjs-modules/mailer/dist";

@Injectable()
export class AuthService {
  constructor(
    private readonly JWTService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly mailer: MailerService,
  ) {}

  createToken(user: tb_oticas) {
    return {
      accessToken: this.JWTService.sign(
        {
          otica_id: user.otica_id,
          nome_usuario: user.nome_usuario,
          email: user.email,
        },
        {
          expiresIn: "7 days",
          subject: String(user.otica_id),
          audience: "users",
          issuer: "login",
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      const data = this.JWTService.verify(token, {
        audience: "users",
        issuer: "login",
      });

      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (e) {
      return false;
    }
  }

  async login(email: string, senha: string) {
    const user = await this.prisma.tb_oticas.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException("E-mail ou senha incorreto.");
    }

    if (!(await bcrypt.compare(senha, user.senha))) {
      throw new UnauthorizedException("E-mail ou senha incorreto.");
    }

    return this.createToken(user);
  }

  async forget(email: string) {
    const user = await this.prisma.tb_oticas.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException("E-mail está incorreto.");
    }
    const token = this.JWTService.sign(
      {
        id: user.otica_id,
      },
      {
        expiresIn: "30 minutes",
        subject: String(user.otica_id),
        audience: "forget",
        issuer: "users",
      },
    );

    await this.mailer.sendMail({
      subject: "Recuperar senha",
      to: "kvoltareli@gmail.com",
      template: "forget",
      context: {
        name: user.nome_usuario,
        token,
      },
    });
    return true;
  }

  async reset(senha: string, token: string) {
    try {
      const data: any = this.JWTService.verify(token);

      if (isNaN(Number(data.id))) {
        throw new BadRequestException("Token é inválido.");
      }

      const salt = await bcrypt.genSalt();
      senha = await bcrypt.hash(senha, salt);

      const user = await this.prisma.tb_oticas.update({
        where: {
          otica_id: Number(data.id),
        },
        data: {
          senha,
        },
      });

      return this.createToken(user);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async register(data: AuthRegisterDTO) {
    const user = await this.userService.create(data);
    return this.createToken(user);
  }
}
