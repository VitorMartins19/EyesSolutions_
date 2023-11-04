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
  
  export class CreatePayDTO {
  
    @IsString()
    user_atividade: string;
    
    @IsNumber()
    plano_id: number;

    @IsNumber()
    otica_id : number;
  }
  