import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller()
export class JsController {
  @Post()
  init() {
    return 'Init ApiController > JsController';
  }
}
