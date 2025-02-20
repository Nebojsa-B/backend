import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { Location } from 'src/location/entities/location.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CountryService {

  constructor(
    @InjectRepository(Country) private readonly countryRepo: Repository<Country>,
    @InjectRepository(Location) private readonly locationRepo: Repository<Location>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private httpService: HttpService
  ){}

  async create(createCountryDto: CreateCountryDto) {
    const country = await this.countryRepo.save({
      ...createCountryDto
    });
    return country;
  }

  async findAll() {
    return await this.countryRepo.find();
  }

  async findOne(id: number) {
    const country = await this.countryRepo.findOneBy({id});
    if(!country) {
      throw new NotFoundException('Country not found.');
    }

    return country;
  }

  async update(id: number, updateCountryDto: UpdateCountryDto) {
    const country = await this.countryRepo.findOneBy({id});
    if(!country){
      throw new NotFoundException('Country not found.');
    }

    await this.countryRepo.update(id, updateCountryDto);

  }

  async remove(id: number) {
    const country = await this.countryRepo.findOneBy({id});
    if(!country){
      throw new NotFoundException('Country not found');
    }
    await this.countryRepo.delete(id);

    return id;
  }

  async getCountryDropdown() {
    return await this.countryRepo.find({select: ['id', 'name', 'code', 'countryFlagUrl']})
  }

  async getCountryGeoJson(name: string) {
    const geoJson = await this.httpService.axiosRef.get('https://nominatim.openstreetmap.org/search.php?q=kosovo&polygon_geojson=1&format=jsonv2');

    console.log(JSON.stringify(geoJson.data[0].geojson));

    const country = await this.countryRepo.findOneBy({name: 'Rejected'});
    if(!country)
      throw new NotFoundException('Country not found');

    console.log(country);

    country.geoJson = JSON.stringify(geoJson.data[0].geojson);
    this.countryRepo.save(country);
  }

  async getCountryBasedOnUser(id: number) {
    const user = await this.userRepo.findOne({where: {id}});
    if(!user)
      throw new NotFoundException('User not found');

    const location = await this.locationRepo.findOne({where: {id: user.locationId}});
    if(!location)
    throw new NotFoundException('Location not found');

    const country = await this.countryRepo.findOne({where: {id: location.countryId}})
    if(!country)
      throw new NotFoundException('Country not found');

    return country;
  }

}
