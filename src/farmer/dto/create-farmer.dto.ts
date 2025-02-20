import { Type } from "class-transformer";
import { IsArray, IsOptional, IsUrl, ValidateNested } from "class-validator";
import { CreateFarmDto } from "src/farm/dto/create-farm.dto";
import { CreateLocationDto } from "src/location/dto/create-location.dto";
import { CreateProductDto } from "src/product/dto/create-product.dto";
import { CreateUserDto } from "src/user/dto/create-user.dto";

export class CreateFarmerDto {
  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto

  @ValidateNested()
  @Type(() => CreateFarmDto)
  farm: CreateFarmDto;

  @ValidateNested({ each: true })
  @Type(() => CreateLocationDto)
  location: CreateLocationDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductDto)
  products: CreateProductDto[];
}