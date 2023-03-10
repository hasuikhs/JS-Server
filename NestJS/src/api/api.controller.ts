import { Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthenticationGuard } from 'src/auth/auth.guard';
import { AccessTokenGuard } from 'src/auth/guard/accessToken.guard';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';

@UseGuards(AuthenticationGuard, AccessTokenGuard)
@UseInterceptors(LoggingInterceptor)
@Controller()
export class ApiController {
  @Post()
  init() {
    console.log('console Init ApiController');
    return 'Init ApiController';
  }
}
