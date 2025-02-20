import { Farmer } from "src/farmer/entities/farmer.entity";
import { OrderProduct } from "src/order-product/entities/order-product.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderStatus } from "../enums/order-status.enum";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Farmer, (farmer) => farmer.orders)
  @JoinColumn()
  farmer: Farmer;

  @OneToMany(() => OrderProduct, (orderItem) => orderItem.order, { cascade: true })
  orderProducts: OrderProduct[];

  @Column()
  totalPrice: number;

  @Column({ type: 'enum', enum: OrderStatus })
  orderStatus: OrderStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
