import { IsNumber } from "class-validator";

export class latLonDto {
  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}