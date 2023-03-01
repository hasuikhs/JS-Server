import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get('token')
  getAuth(): string {
    return 'auth/token';
  }
}
