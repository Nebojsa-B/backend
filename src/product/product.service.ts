import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Farmer } from 'src/farmer/entities/farmer.entity';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { FarmerService } from 'src/farmer/farmer.service';
import { NotFound } from '@aws-sdk/client-s3';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product) private readonly productRepo: Repository<Product>,
    @InjectRepository(Farmer) private readonly farmerRepo: Repository<Farmer>  
  ){}

  async create(createProductDto: CreateProductDto) {
    const product = await this.productRepo.create(createProductDto);
    await this.productRepo.save(product);
    
    return product;
  }

  async addProductToFarmer(farmerId: number, productDto: CreateProductDto) {
    // Find the farmer entity including the products relation
    const farmer = await this.farmerRepo.findOne({
      where: { id: farmerId },
      relations: ['products']
    });
  
    if (!farmer) {
      throw new NotFoundException('Farmer not found');
    }
  
    // Create a new product
    const newProduct = await this.productRepo.create(productDto);
  
    // Append the new product to the existing products array
    farmer.products = [...farmer.products, newProduct];
  
    // Save the updated farmer entity
    await this.farmerRepo.save(farmer);
  
    return farmer;
  }

  async findAll() {
    return await this.productRepo.find();;
  }

  async findOne(id: number) {
    return await this.productRepo.findOne({
      where: { id },
      relations: ['farmer'],  
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepo.findOneBy({id});
    if(!product){
      throw new NotFoundException('Product not found');
    }

    // await this.productRepo.update(id, updateProductDto);

    return updateProductDto;
  }

  async remove(id: number) {
    const product = await this.productRepo.findOneBy({id});
    if(!product){
      throw new NotFoundException('Product not found.');
    }

    await this.productRepo.delete(id);

    return product.id;
  }
}
