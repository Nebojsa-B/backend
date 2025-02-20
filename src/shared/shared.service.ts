import { Injectable } from '@nestjs/common';
import { CreateSharedDto } from './dto/create-shared.dto';
import { UpdateSharedDto } from './dto/update-shared.dto';
import { latLonDto } from './dto/latitude-longitude-shared.dto';
import { NominatimService } from './reverse-geocoding/nominatim/nominatim.service';
import { S3Service } from 'src/s3/s3.service';
import { CityAddressDto } from './dto/city-address-shared.dto';

@Injectable()
export class SharedService {

  constructor(private readonly nominatimService: NominatimService,
  private s3Service: S3Service
  ){}


  create(createSharedDto: CreateSharedDto) {
    return 'This action adds a new shared';
  }

  findAll() {
    return `This action returns all shared`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shared`;
  }

  update(id: number, updateSharedDto: UpdateSharedDto) {
    return `This action updates a #${id} shared`;
  }

  remove(id: number) {
    return `This action removes a #${id} shared`;
  }

  reverseGeocoding(latLon: latLonDto) {
    return this.nominatimService.reverseGeoCoding(latLon);
  }

  getCoordinatesBy(cityAddressDto: CityAddressDto){
    return this.nominatimService.getCoordinatesBy(cityAddressDto);
  }

  async uploadFileToAws(file: Express.Multer.File){
    const key = `${file.originalname}${Date.now()}`;
    const fileUrl = await this.s3Service.uploadFile(file,key);

    return {fileUrl};
  }
}
