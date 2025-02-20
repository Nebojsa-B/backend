import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Order } from 'src/order/entities/order.entity';
import { Farmer } from 'src/farmer/entities/farmer.entity';
import { Location } from 'src/location/entities/location.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Order, Farmer, Location])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
