import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Farm } from "src/farm/entities/farm.entity";
import { Product } from "src/product/entities/product.entity";
import { Order } from "src/order/entities/order.entity";
import { Review } from "src/review/entities/review.entity";

@Entity()
export class Farmer {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, user => user.farmer)
  user: User;

  @OneToOne(() => Farm, (farm) => farm.farmer, {cascade: true})
  @JoinColumn()
  farm: Farm;

  @OneToMany(() => Product, (product) => product.farmer, {cascade: true})
  products: Product[];

  @OneToMany(() => Order, (order) => order.farmer)
  orders: Order[];

  @OneToMany(() => Review, (review) => review.farmer)
  reviews: Review[];
}
