import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { ApiTags } from '@nestjs/swagger';
import { CookieValue } from 'src/farmer/decorators/get-user-id.decorator';

@ApiTags('Country')
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  create(@Body() createCountryDto: CreateCountryDto) {
    return this.countryService.create(createCountryDto);
  }

  @Get('based-on-user')
  getCountryBasedOnUser(@CookieValue('userId') userId: string){
    return this.countryService.getCountryBasedOnUser(+userId);
  }

  @Get()
  findAll() {
    return this.countryService.findAll();
  }

  @Get('dropdown')
  getCountryDropdown() {
    return this.countryService.getCountryDropdown();
  }

  @Get('geojson/:name')
  getCountryGeoJson(@Query('name') name: string) {
    return this.countryService.getCountryGeoJson(name);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.countryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCountryDto: UpdateCountryDto) {
    return this.countryService.update(+id, updateCountryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.countryService.remove(+id);
  }

}
