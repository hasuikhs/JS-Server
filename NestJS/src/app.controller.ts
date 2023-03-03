import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as bcrypt from 'bcrypt';
import { SALT } from './config/bcrypt.config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    const hash = await bcrypt.hash('test', SALT);
    console.log(hash)
    // bcrypt.genSaltSync();
    return this.appService.getHello();
  }
}
