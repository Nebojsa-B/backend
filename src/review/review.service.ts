import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Farmer } from 'src/farmer/entities/farmer.entity';

@Injectable()
export class ReviewService {

  constructor(
    @InjectRepository(Review) private reviewRepo: Repository<Review>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Farmer) private farmerRepo: Repository<Farmer> 
  ){}

  async createReview(userId: number, createReviewDto: CreateReviewDto): Promise<Review> {
    const { farmerId, stars, comment } = createReviewDto;

    const user = await this.userRepo.findOne({where: {id: userId}});
    const farmer = await this.farmerRepo.findOne({where: {id: farmerId}});

    if (!user || !farmer) {
      throw new NotFoundException('User or Farmer not found');
    }

    const review = this.reviewRepo.create({
      user,
      farmer,
      stars,
      comment,
    });

    return this.reviewRepo.save(review);
  }

  async getReviewsForFarmer(farmerId: number): Promise<Review[]> {
    return this.reviewRepo.find({ where: { farmer: { id: farmerId } } });
  }

  async removeCustomerReview(id: number) {
    const customerReview  = await this.reviewRepo.findOne({ where: { id } });

    if(!customerReview)
      throw new NotFoundException(`Customer Review with id: ${id} not found.`);

    await this.reviewRepo.remove(customerReview);
  }
}
