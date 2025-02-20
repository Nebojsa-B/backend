import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { UpdateFarmerDto } from './dto/update-farmer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Farmer } from './entities/farmer.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { LocationService } from 'src/location/location.service';
import { ProductService } from 'src/product/product.service';
import { User } from 'src/user/entities/user.entity';
import { SearchQueryDto } from './dto/search-query.dto';

@Injectable()
export class FarmerService {

  constructor(
    @InjectRepository(Farmer) private readonly farmerRepo: Repository<Farmer>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private userService: UserService,
    private locationService: LocationService,
    private productService: ProductService
  ){}

  async create(id: number, createFarmerDto: CreateFarmerDto) {
    const { farm, location, user, products } = createFarmerDto;

    const userEntity = await this.userService.findOne(id, { relations: ['farmer', 'farmer.farm'] });
    
    if (!userEntity) {
      throw new NotFoundException('User not found');
    }

    await this.userService.update(id, user);

    await this.locationService.update(userEntity.locationId, location);

    const productEntities = await Promise.all(
      products.map((product) => this.productService.create(product))
    );

    const farmerEntity = await this.farmerRepo.save({
      farm,
      user: userEntity,
      products: productEntities
    });

    return farmerEntity;

  } 

  async findAll(userId: number, searchQuery: SearchQueryDto) {
    const { firstName, lastName, farmName, city, productType, productName } = searchQuery;

    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['location'], 
  });
    
  const query = await this.farmerRepo.createQueryBuilder('farmer')
  .leftJoinAndSelect('farmer.user', 'user')
  .leftJoinAndSelect('user.location', 'location')
  .leftJoinAndSelect('farmer.products', 'products')
  .where('location.countryId = :countryId', { countryId: user.location.countryId });

  // Conditionally add filters based on the search query
  if (firstName) {
    query.andWhere('user.firstName ILIKE :firstName', { firstName: `%${firstName}%` });
  }

  if (lastName) {
    query.andWhere('user.lastName ILIKE :lastName', { lastName: `%${lastName}%` });
  }

  if (farmName) {
    query.andWhere('farmer.farmName ILIKE :farmName', { farmName: `%${farmName}%` });
  }

  if (city) {
    query.andWhere('location.city ILIKE :city', { city: `%${city}%` });
  }

  if (productType) {
    query.andWhere('products.type ILIKE :productType', { productType: `%${productType}%` });
  }

  if (productName) {
    query.andWhere('products.name ILIKE :productName', { productName: `%${productName}%` });
  }

  // Execute the query and return results
  return await query.getMany();
  }

  async findOne(id: number) {
    return await this.farmerRepo.createQueryBuilder('farmer')
    .leftJoinAndSelect('farmer.user', 'user')
    .leftJoinAndSelect('user.location', 'location')
    .leftJoinAndSelect('location.country', 'country')
    .leftJoinAndSelect('farmer.products', 'products')
    .leftJoinAndSelect('farmer.farm', 'farm')
    .where('farmer.id = :id', { id })
    .getOne();

  }

  async update(id: number, updateFarmerDto: UpdateFarmerDto) {
    const farmer = await this.farmerRepo.findOneBy({id});
    if(!farmer){
      throw new NotFoundException('Farmer not found');
    }

    // await this.farmerRepo.update(id, updateFarmerDto);

    return updateFarmerDto;
  }

  async remove(id: number) {
    const farmer = await this.farmerRepo.findOneBy({id});
    
    if(!farmer){
      throw new NotFoundException('Farmer not found.');
    }

    await this.farmerRepo.delete(farmer.id);

    return farmer.id;
  }
}
