import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderProductDto } from './dto/create-order-product.dto';
import { UpdateOrderProductDto } from './dto/update-order-product.dto';
import { Repository } from 'typeorm';
import { OrderProduct } from './entities/order-product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderProductService {

  constructor(
    @InjectRepository(OrderProduct) private readonly orderProductRepository: Repository<OrderProduct>
  ){}

  create(createOrderProductDto: CreateOrderProductDto) {
    return 'This action adds a new orderProduct';
  }

  findAll() {
    return `This action returns all orderProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderProduct`;
  }

  update(id: number, updateOrderProductDto: UpdateOrderProductDto) {
    return `This action updates a #${id} orderProduct`;
  }

  async remove(id: number) {
    const orderProduct = await this.orderProductRepository.findOneBy({id});

    if(!orderProduct){
      throw new NotFoundException('Order Product not found');
    }
    
    await this.orderProductRepository.delete(id);

    return id;
  }

}
