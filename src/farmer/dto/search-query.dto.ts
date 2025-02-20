import { IsOptional, IsString } from "class-validator";

export class SearchQueryDto {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  farmName: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  productType: string;

  @IsString()
  @IsOptional()
  productName: string;  
}