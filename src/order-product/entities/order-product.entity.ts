import { Order } from "src/order/entities/order.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.orderProducts)
  @JoinColumn()
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderProducts)
  @JoinColumn()
  product: Product;

  @Column()
  quantity: number;

  @Column()
  price: number; // Price of the product at the time of the order
}
