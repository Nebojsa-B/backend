import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LocationService {

  constructor(@InjectRepository(Location) private readonly locationRepository: Repository<Location>,){}

  async create(createLocationDto: CreateLocationDto) {
    const location = await this.locationRepository.create(createLocationDto);
    await this.locationRepository.save(location);

    return location;
  }

  async findAll() {
    return await this.locationRepository.find();
  }

  async findOne(id: number) {
    const location = await this.locationRepository.findOne({where: {id}});
    if(!location)
      throw new NotFoundException('Not Found Location');

    return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    await this.locationRepository.update(id, updateLocationDto);
  }

  async remove(id: number) {
    const location = await this.locationRepository.findOne({where: {id}});
    
    if(!location)
      throw new NotFoundException('Not found location');

    this.locationRepository.remove(location);

    return location.id;
  }
}
