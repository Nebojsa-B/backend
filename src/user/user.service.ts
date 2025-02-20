import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User> 
  ){}

  async findAll() {
    // return await this.userRepo.find({
    //  relations: ['farmer', 'farmer.products'] 
    // });

    return await this.userRepo.createQueryBuilder('user')
    .leftJoinAndSelect('user.farmer', 'farmer')
    .leftJoinAndSelect('user.location', 'location')
    .leftJoinAndSelect('farmer.products', 'products')
    .getMany();
  }

  async findOne(id: number, options?: { relations?: string[] }) {
    const user = await this.userRepo.findOne({
      where: {id}, 
      relations: options?.relations || ['farmer', 'location', 'farm']
    })

    if(!user){
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOne({where: {id}});
    if(!user){
      throw new NotFoundException('User not found.');
    }

    await this.userRepo.update(id, updateUserDto);
  }

  async remove(id: number) {
    const user = await this.userRepo.findOneBy({id});
    if(!user){
      throw new NotFoundException('User not found.');
    }
    
    await this.userRepo.delete(id);

    return id;
  }

  async getCurrentUser(id: number) {
    return await this.userRepo.createQueryBuilder('user')
      .leftJoinAndSelect('user.farmer', 'farmer')
      .leftJoinAndSelect('user.location', 'location')
      .leftJoinAndSelect('farmer.farm', 'farm')
      .leftJoinAndSelect('farmer.products', 'products')
      .where('user.id = :id', { id })
      .getOne();
  }

  
}
