import { IsNumber, IsOptional, IsString } from "class-validator";


export class CreateProductDto {
  @IsString()
  type: string;
  
  @IsString()
  name: string;
  
  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsString()
  description: string;
  
  @IsString()
  startDate: string;
  
  @IsString()
  endDate: string;

  @IsOptional()
  productImages?: string[];
}
