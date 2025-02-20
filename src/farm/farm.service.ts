import { Injectable } from '@nestjs/common';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Farm } from './entities/farm.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FarmService {

  constructor(@InjectRepository(Farm) private readonly farmRepo: Repository<Farm>){}

  async create(createFarmDto: CreateFarmDto) {
    const farm = await this.farmRepo.save(createFarmDto);

    return farm;
  }

  async findAll() {
    return await this.farmRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} farm`;
  }

  async update(id: number, updateFarmDto: UpdateFarmDto) {
    await this.farmRepo.update(id, updateFarmDto);
  }

  remove(id: number) {
    return `This action removes a #${id} farm`;
  }
}
