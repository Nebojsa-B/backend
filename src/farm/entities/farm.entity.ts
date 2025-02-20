import { Farmer } from "src/farmer/entities/farmer.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Farm {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  farmName: string;

  @Column()
  farmNumber: string;

  @Column({nullable: true})
  motto: string

  @Column({nullable: true})
  description: string;

  @OneToOne(() => Farmer, (farmer) => farmer.farm, {nullable: true})
  farmer: Farmer;

}
