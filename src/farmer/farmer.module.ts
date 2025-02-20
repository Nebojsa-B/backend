import { Module } from '@nestjs/common';
import { FarmerService } from './farmer.service';
import { FarmerController } from './farmer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Farmer } from './entities/farmer.entity';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';
import { Country } from 'src/country/entities/country.entity';
import { Farm } from 'src/farm/entities/farm.entity';
import { Location } from 'src/location/entities/location.entity';
import { UserService } from 'src/user/user.service';
import { LocationService } from 'src/location/location.service';
import { ProductService } from 'src/product/product.service';
import { FarmService } from 'src/farm/farm.service';
import { Order } from 'src/order/entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Farmer, Product, Country, Farm, Location, Order])
  ],
  controllers: [FarmerController],
  providers: [FarmerService, UserService, LocationService, FarmService, ProductService],
})
export class FarmerModule {}
