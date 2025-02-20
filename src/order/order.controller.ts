import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { CookieValue } from 'src/farmer/decorators/get-user-id.decorator';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { OrderStatus } from './enums/order-status.enum';
import { GetOrderDto } from './dto/get-order.dto';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('add-to-cart')
  addToCart(@CookieValue('userId') userId: string, @Body() addToCartDto: AddToCartDto){
    return this.orderService.addToCart(+userId, addToCartDto);
  }

  @Post('create')
  createOrder(@CookieValue('userId') userId: string, @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(+userId, createOrderDto);
  }

  @Get()
  getOrders(@CookieValue('userId') userId: string, @Query() getOrderDto: GetOrderDto) {
    return this.orderService.getOrders(+userId, getOrderDto);
  }

  @Post('checkout')
  checkout(@CookieValue('userId') userId: string) {
    return this.orderService.checkout(+userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.cancelOrder(+id);
  }

  @Delete('remove-product-from-order/:id')
  removeProductFromOrder(@Param('id') id: string){
    return this.orderService.removeProductFromOrder(id);
  }
  
}
