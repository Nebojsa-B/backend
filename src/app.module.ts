import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FarmerModule } from './farmer/farmer.module';
import { CountryModule } from './country/country.module';
import { ProductModule } from './product/product.module';
import { SharedModule } from './shared/shared.module';
import { S3Module } from './s3/s3.module';
import { LocationModule } from './location/location.module';
import { FarmModule } from './farm/farm.module';
import { OrderModule } from './order/order.module';
import { OrderProductModule } from './order-product/order-product.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres123',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    FarmerModule,
    CountryModule,
    ProductModule,
    SharedModule,
    S3Module,
    LocationModule,
    FarmModule,
    OrderModule,
    OrderProductModule,
    ReviewModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
