import { IsString } from "class-validator";

export class CityAddressDto {
  @IsString()
  city: string;

  @IsString()
  address: string;
}