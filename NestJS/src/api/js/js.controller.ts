import { Controller, Get } from '@nestjs/common';

@Controller('js')
export class JsController {
  @Get('test')
  test() {
    return 'api/js/test'
  }
}
