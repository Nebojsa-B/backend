import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';
import { CityAddressDto } from 'src/shared/dto/city-address-shared.dto';
import { latLonDto } from 'src/shared/dto/latitude-longitude-shared.dto';
import { GeoCodingResponse } from 'src/shared/interfaces/GeoCodingResponse';

@Injectable()
export class NominatimService {
  constructor(private readonly httpService: HttpService){}

  reverseGeoCoding(latLonDto: latLonDto): Observable<AxiosResponse<GeoCodingResponse>>{
    return this.httpService.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latLonDto.latitude}&lon=${latLonDto.longitude}&addressdetails=1`).pipe(map(data => data.data));
  }

  getCoordinatesBy(cityAddressDto: CityAddressDto): Observable<AxiosResponse<GeoCodingResponse>>{
    const {city, address} = cityAddressDto;

    return this.httpService.get(`https://nominatim.openstreetmap.org/search?city=${city}&street=${address}&format=json`).pipe(map(data => data.data))
  }
}
