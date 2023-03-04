import { Controller, Get, Post, Body } from '@nestjs/common';
import { User } from 'src/user/user.model';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('test')
  getAuth(): string {
    return 'auth/token';
  }

  @Post('signin')
  async signIn(@Body() user: User) {
    return await this.authService.validateUser(user.userId, user.password);
  }
}
