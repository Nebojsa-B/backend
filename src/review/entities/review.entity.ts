import { Farmer } from "src/farmer/entities/farmer.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.reviews, { eager: true })
  user: User;

  @ManyToOne(() => Farmer, (farmer) => farmer.reviews, { eager: true })
  farmer: Farmer;

  @Column({ type: 'int', width: 1 })
  stars: number;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
