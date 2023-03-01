import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class ApiController {
  @Get('test')
  testApi() {
    return 'api/test';
  }
}
