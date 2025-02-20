import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Farmer } from 'src/farmer/entities/farmer.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, User, Farmer])],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
