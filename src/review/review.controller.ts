import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ApiTags } from '@nestjs/swagger';
import { Review } from './entities/review.entity';
import { CookieValue } from 'src/farmer/decorators/get-user-id.decorator';

@ApiTags('Review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async createReview(
    @CookieValue('userId') userId: string,
    @Body() createReviewDto: CreateReviewDto): Promise<Review> {
    return this.reviewService.createReview(+userId, createReviewDto);
  }

  @Get('farmer/:farmerId')
  async getReviewsForFarmer(@Param('farmerId') farmerId: number): Promise<Review[]> {
    return this.reviewService.getReviewsForFarmer(farmerId);
  }

  @Delete(':id')
  async removeCustomerReview(@Param('id') id: number) {
    return this.reviewService.removeCustomerReview(id);
  }

}
