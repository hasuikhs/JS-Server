import { Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthenticationGuard } from '../../auth/auth.guard';
import { LoggingInterceptor } from '../../interceptors/logging.interceptor';

@UseGuards(AuthenticationGuard)
@UseInterceptors(LoggingInterceptor)
@Controller()
export class JsController {
  @Post()
  init() {
    return 'Init ApiController > JsController';
  }
}
