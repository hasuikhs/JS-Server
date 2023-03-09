import { Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';

@UseGuards(AuthGuard)
@UseInterceptors(LoggingInterceptor)
@Controller()
export class ApiController {
  @Post()
  init() {
    console.log('console Init ApiController');
    return 'Init ApiController';
  }
}
