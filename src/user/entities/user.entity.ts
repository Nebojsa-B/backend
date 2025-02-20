import { Farmer } from "src/farmer/entities/farmer.entity";
import { Location } from "src/location/entities/location.entity";
import { Order } from "src/order/entities/order.entity";
import { Review } from "src/review/entities/review.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @Column({nullable: true})
  firstName: string;

  @Column({nullable: true})
  lastName: string;

  @Column({nullable: true})
  phone: string;

  @Column({nullable: true})
  coverImageUrl: string;

  @Column({nullable: true})
  profileImageUrl: string;

  @OneToOne(() => Farmer, farmer => farmer.user, {nullable: true})
  @JoinColumn()
  farmer: Farmer;

  @Column({nullable: true})
  farmerId: number;

  @OneToOne(() => Location, (location) => location.user, {cascade: true})
  @JoinColumn()
  location: Location;

  @Column({nullable: true})
  locationId: number;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Review, (review) => review.farmer)
  reviews: Review[];
}
