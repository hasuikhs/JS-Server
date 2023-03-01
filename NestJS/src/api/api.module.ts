import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { JsController } from './js/js.controller';
import { JsModule } from './js/js.module';

@Module({
  providers: [ApiService],
  controllers: [JsController],
  imports: [JsModule]
})
export class ApiModule {}
