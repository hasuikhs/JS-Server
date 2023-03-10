import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from 'src/auth/auth.guard';

@UseGuards(AuthenticationGuard)
@Controller()
export class JsController {
  @Post()
  init() {
    return 'Init ApiController > JsController';
  }
}
