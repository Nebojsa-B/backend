import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Farmer } from 'src/farmer/entities/farmer.entity';
import { OrderProduct } from 'src/order-product/entities/order-product.entity';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';
import { Order } from './entities/order.entity';
import { Product } from 'src/product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Farmer, User, OrderProduct, Order, Product])],
  controllers: [OrderController],
  providers: [OrderService, UserService, ProductService],
})
export class OrderModule {}
