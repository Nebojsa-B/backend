import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Farmer } from 'src/farmer/entities/farmer.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Product, Farmer])
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
