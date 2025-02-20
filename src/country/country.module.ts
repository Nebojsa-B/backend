import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { Farmer } from 'src/farmer/entities/farmer.entity';
import { HttpModule } from '@nestjs/axios';
import { Location } from 'src/location/entities/location.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Country, Location, User]),
    HttpModule
  ],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}
