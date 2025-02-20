import { IsOptional, IsString } from "class-validator";

export class CreateFarmDto {
  @IsString()
  farmName: string;

  @IsString()
  farmNumber: string;

  @IsOptional()
  @IsString()
  motto: string

  @IsOptional()
  @IsString()
  description: string;
}
