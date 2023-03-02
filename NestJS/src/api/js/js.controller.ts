import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('js')
export class JsController {
  @Get('test')
  test() {
    return 'api/js/test'
  }
}
