import {
  IsString,
  IsEmail,
  IsStrongPassword,
  IsOptional,
  IsDateString,
  IsEnum,
  IsInt,
  isInt,
  IsNumber,
} from "class-validator";

export class CreateUserDTO {
  @IsString()
  nome_otica: string;
  @IsString()
  nome_usuario: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minNumbers: 0,
    minLowercase: 0,
    minUppercase: 0,
    minSymbols: 0,
  })
  senha: string;

  @IsString()
  plano_ativo: string;

  @IsOptional()
  @IsInt()
  plano_id?:number;
}
