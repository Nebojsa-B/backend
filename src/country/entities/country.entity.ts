import { Location } from "src/location/entities/location.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  currency: string;

  @Column()
  countryFlagUrl: string;

  @Column('decimal')
  lat: number;

  @Column('decimal')
  lng: number;

  @Column()
  zoom: number;

  @Column({default: null})
  geoJson: string;

  @OneToMany(() => Location, (location) => location.country)
  locations: Location[];
}
