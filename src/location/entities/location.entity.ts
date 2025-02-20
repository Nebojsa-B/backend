import { Country } from "src/country/entities/country.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Location {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  city: string;

  @Column({nullable: true})
  address:string;

  @Column('float', {nullable: true})
  lat: number;

  @Column('float', {nullable: true})
  lng: number;

  @OneToOne(() => User, (user) => user.location)
  user: User;

  @ManyToOne(() => Country, (country) => country.locations)
  @JoinColumn()
  country: Country;

  @Column({nullable: true})
  countryId: number;
}
