import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Request } from '@nestjs/common';
import { SharedService } from './shared.service';
import { CreateSharedDto } from './dto/create-shared.dto';
import { UpdateSharedDto } from './dto/update-shared.dto';
import { ApiTags } from '@nestjs/swagger';
import { latLonDto } from './dto/latitude-longitude-shared.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CityAddressDto } from './dto/city-address-shared.dto';

@ApiTags('Shared')
@Controller('shared')
export class SharedController {
  constructor(private readonly sharedService: SharedService
  ) {}

  @Post()
  create(@Body() createSharedDto: CreateSharedDto) {
    return this.sharedService.create(createSharedDto);
  }

  @Get()
  findAll() {
    return this.sharedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sharedService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSharedDto: UpdateSharedDto) {
    return this.sharedService.update(+id, updateSharedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sharedService.remove(+id);
  }

  @Post('/reverse-geocoding')
  reverseGeocoding(@Body() latLon: latLonDto){
    return this.sharedService.reverseGeocoding(latLon);
  }

  @Post('/coordinates-for-map')
  getCoordinatesBy(@Body() cityAddressDto: CityAddressDto){
    return this.sharedService.getCoordinatesBy(cityAddressDto)
  }

  @Post('upload-file-to-aws')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileToAws(
    @UploadedFile() file: Express.Multer.File,
    @Request() req){
      return this.sharedService.uploadFileToAws(file);
  }
}
