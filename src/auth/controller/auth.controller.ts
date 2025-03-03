import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignUpDto } from '../dtos/sign-up.dto';
import { SignInDto } from '../dtos/sign-in.dto';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { RefreshTokenGuard } from '../guards/refresh-token.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService){}

  @Post('sign-up')
  async signUp(
    @Body() signUpDto: SignUpDto,
    @Res({passthrough: true}) response) {
    const { accessToken, refreshToken, user } = await this.authService.signUp(signUpDto);

    response.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 36000000 
   });

   response.cookie('refreshToken', refreshToken, {
     httpOnly: true,
     secure: true,
     maxAge: 36000000 
  });

  response.cookie('userId', user.id, {
   httpOnly: true,
   secure: true,
   maxAge: 36000000
  });

   return {
     accessToken,
     refreshToken,
     user
   }
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto, @Res({passthrough: true}) response) {

    const {accessToken, refreshToken, user} = await this.authService.signIn(signInDto);

    response.cookie('accessToken', accessToken, {
       httpOnly: true,
       secure: true,
       maxAge: 36000000 
    });

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 36000000 
   });

   response.cookie('userId', user.id, {
    httpOnly: true,
    secure: true,
    maxAge: 36000000
   });

    return {
      accessToken,
      refreshToken,
      user
    }
  }

  @Get('sign-out')
  signOut(@Res({ passthrough: true }) response){
    response.cookie('accessToken', '', { httpOnly: true, secure: true, maxAge: 0 });
    response.cookie('refreshToken', '', { httpOnly: true, secure: true, maxAge: 0 });
    response.cookie('userId', '', { httpOnly: true, secure: true, maxAge: 0 });
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh-token')
  async refreshToken(@Req() request: Request, @Res({passthrough: true}) response) {
    const {accessToken, user} = await this.authService.refreshToken(request.cookies['userId']);

    response.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 900000 
   });

   return {accessToken, user};  
  }

}
