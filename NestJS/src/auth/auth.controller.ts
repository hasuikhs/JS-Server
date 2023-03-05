import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/user.model';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('test')
  getAuth(): string {
    return 'auth/token';
  }

  // @Post('signup')
  // async signUp(@Body() user: User) {
  //   return
  // }

  @Post('signin')
  async signIn(@Body() user: User) {
    return await this.authService.validateUser(user.userId, user.password);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    console.log('tet')
    return req.user;
  }
}
