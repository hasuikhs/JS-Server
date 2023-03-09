import { Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller({ path: '/' })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }
}
