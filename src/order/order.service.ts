import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderStatus } from './enums/order-status.enum';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';
import { OrderProduct } from 'src/order-product/entities/order-product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrderDto } from './dto/get-order.dto';

@Injectable()
export class OrderService {

  constructor(@InjectRepository(Order) private readonly orderRepo: Repository<Order>,
  private userService: UserService,
  private productService: ProductService
){}

  async addToCart(userId: number, addToCartDto: AddToCartDto) {
    const { productId, quantity } = addToCartDto;

    let order = await this.orderRepo.findOne({
    where: { user: { id: userId }, orderStatus: OrderStatus.PENDING },
    relations: ['orderProducts'],
  });

  if (!order) {
    order = new Order();
    order.user = await this.userService.findOne(userId, { relations: ['farmer', 'farmer.farm'] });
    order.farmer = await this.productService.findOne(productId).then(p => p.farmer);
    order.orderStatus = OrderStatus.PENDING;
    order.totalPrice = 0;
    order.orderProducts = [];
  }

  const product = await this.productService.findOne(productId);
  const orderProduct = new OrderProduct();
  orderProduct.product = product;
  orderProduct.quantity = quantity;
  orderProduct.price = product.price;

  order.orderProducts.push(orderProduct);
  order.totalPrice += product.price * quantity;

  return this.orderRepo.save(order);
  }

  async createOrder(userId: number, createOrderDto: CreateOrderDto) {
    const { productId, quantity } = createOrderDto;

    const product = await this.productService.findOne(productId);

    if(!product)
      throw new NotFoundException(`Product with id:${productId} not found.`)

    const order = new Order();
    order.user = await this.userService.findOne(userId, { relations: ['farmer', 'farmer.farm'] });
    order.farmer = product.farmer;
    order.orderStatus = OrderStatus.COMPLETED;
    order.totalPrice = product.price * quantity;

    const orderProduct = new OrderProduct();
    orderProduct.product = product;
    orderProduct.quantity = quantity;
    orderProduct.price = product.price;
    order.orderProducts = [orderProduct];

    return this.orderRepo.save(order);
  }


  async getOrders(userId:number, getOrderDto?: GetOrderDto) {
    const {orderStatus} = getOrderDto;
    return await this.orderRepo.createQueryBuilder('order')
      // .leftJoinAndSelect("order.farmer", "farmer")
      .leftJoinAndSelect("order.orderProducts", "orderProducts")
      .leftJoinAndSelect("orderProducts.product", "product")
      .leftJoinAndSelect("product.farmer", "farmer")
      .leftJoinAndSelect("farmer.farm", "farm")
      .where('order.user = :userId', { userId })
      .andWhere('order.orderStatus = :orderStatus', { orderStatus })
      .andWhere('orderProducts.id IS NOT NULL') // Exclude orders with empty orderProducts
      .orderBy('order.createdAt', 'DESC')
      .getMany();
  }

  async checkout(userId: number){
    // Find all pending orders for the user
  const pendingOrders = await this.orderRepo.find({
    where: { user: { id: userId }, orderStatus: OrderStatus.PENDING },
    relations: ['orderProducts'],
  });

  if (pendingOrders.length === 0) {
    throw new NotFoundException('No pending orders found for this user');
  }

  // Update each pending order to completed
  for (const order of pendingOrders) {
    order.orderStatus = OrderStatus.COMPLETED;
  }

  // Save all orders with updated status
  await this.orderRepo.save(pendingOrders);

  return pendingOrders; // Optionally return the updated orders
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async cancelOrder(id: number) {
    const order = await this.orderRepo.findOne({ where: { id } });

    if (!order) 
      throw new NotFoundException('Order not found');

    order.orderStatus = OrderStatus.CANCELED;

    return this.orderRepo.save(order);
  }

  async removeProductFromOrder(productId: string){

  }

}
