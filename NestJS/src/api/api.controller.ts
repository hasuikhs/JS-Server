import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('api')
export class ApiController {
  @Get('test')
  testApi() {
    return 'api/test';
  }
}
