import { Farmer } from "src/farmer/entities/farmer.entity";
import { OrderProduct } from "src/order-product/entities/order-product.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column('simple-array', {nullable: true})
  productImages: string[];

  @ManyToOne(() => Farmer, (farmer) => farmer.products)
  @JoinColumn()
  farmer: Farmer;

  @OneToMany(() => OrderProduct, (orderItem) => orderItem.product)
  orderProducts: OrderProduct[];
}
