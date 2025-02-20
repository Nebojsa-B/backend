import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateLocationDto {
  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  address:string;

  @IsOptional()
  @IsNumber()
  lat: number;

  @IsOptional()
  @IsNumber()
  lng: number;
}
