import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    
    // Check if accessToken exists in cookies
    const accessToken = request.cookies['accessToken'];
    
    if (!accessToken) {
      throw new UnauthorizedException('Access token exists, cannot refresh token.');
    }

    // Check if refreshToken exists
    const refreshToken = request.cookies['refreshToken'];
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token missing');
    }

    return true; // Proceed to the refreshToken logic
  }
}