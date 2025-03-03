import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SignInDto } from '../dtos/sign-in.dto';
import { SignUpDto } from '../dtos/sign-up.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { HashingService } from '../hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { Country } from 'src/country/entities/country.entity';
import { Location } from 'src/location/entities/location.entity';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Location) private readonly locationRepository: Repository<Location>,
    @InjectRepository(Country) private readonly countryRepository: Repository<Country>,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY) private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
  ){}

  async signUp(signUpDto: SignUpDto) {
    try {
      const { firstName, lastName, email, password, countryId } = signUpDto;

      const country = await this.countryRepository.findOne({where: {id: countryId}});
      if(!country)
        throw new NotFoundException(`Country with id: ${countryId} not exist`)

      const user = await this.userRepository.create({
        firstName,
        lastName,
        email,
        password: await this.hashingService.hash(password),
        location: {
          country
        }
      });

      await this.userRepository.save(user);

      return await this.generateTokens(user);
    } catch (error) {
      const pgUniqueViolationErrorCode = '23505';
      if(error.code === pgUniqueViolationErrorCode){
        console.log('Email already exist');
        throw new ConflictException('Email already exist.')
      }
      throw error;
    }
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.userRepository.findOne({where: {email}, relations: ['location']});

    if(!user){
      throw new NotFoundException();
    }

    const isEqual = await this.hashingService.compare(password, user.password);
    if(!isEqual) {
      throw new Error('Password is not equal');
    }

    return await this.generateTokens(user);
  }

  async generateTokens(user: User){
    const refreshTokenId = randomUUID();

    const [accessToken, refreshToken] = await Promise.all(
      [this.signToken<Partial<ActiveUserData>>(
        user.id,
        this.jwtConfiguration.accessTokenTtl,
        {
          email: user.email
        }
      ),
      this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl, {
        refreshTokenId
      })
    ]);

    return {
      accessToken,
      refreshToken,
      user
    }

  }

  async refreshToken(id: number) {
    const user = await this.userRepository.findOne({where: {id}});
    if(!user) {
      throw new NotFoundException('User no found');
    }
      
    const accessToken = await this.signToken<Partial<ActiveUserData>>(
      user.id,
      this.jwtConfiguration.accessTokenTtl,
      {
        email: user.email
      }
    )

    return {accessToken, user};
  }

  private async signToken<T>(userId: number, expiresIn: number, payload?: T){
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload
      },
      {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        expiresIn
      }
    )
  }
}
