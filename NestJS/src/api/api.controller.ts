import { Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthenticationGuard } from '../auth/auth.guard';
import { AccessTokenGuard } from '../auth/guard/accessToken.guard';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { ResponseInterceptor } from '../interceptors/ResponseInterceptor';

@UseGuards(AuthenticationGuard, AccessTokenGuard)
@UseInterceptors(LoggingInterceptor, ResponseInterceptor)
@Controller()
export class ApiController {
  @Post()
  init() {
    console.log('console Init ApiController');
    return 'Init ApiController';
  }
}
