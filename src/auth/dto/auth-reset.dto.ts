import { IsJWT, IsString, MinLength } from "class-validator";

export class AuthResetDTO {
  @IsString()
  @MinLength(6)
  senha: string;

  @IsJWT()
  token: string;
}
