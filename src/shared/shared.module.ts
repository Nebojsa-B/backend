import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { SharedController } from './shared.controller';
import { NominatimService } from './reverse-geocoding/nominatim/nominatim.service';
import { HttpModule } from '@nestjs/axios';
import { S3Module } from 'src/s3/s3.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [SharedController],
  imports: [HttpModule, S3Module, ConfigModule],
  providers: [SharedService, NominatimService],
  exports: [SharedService]
})
export class SharedModule {}
