import { IsEmail, IsNumber, IsString, MinLength } from "class-validator";

export class SignUpDto {
  @IsEmail()
  email: string;
  
  @MinLength(6)
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNumber()
  countryId: number;
}