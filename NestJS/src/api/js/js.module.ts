import { Module } from '@nestjs/common';
import { JsController } from './js.controller';
import { JsService } from './js.service';

@Module({
  controllers: [JsController],
  providers: [JsService]
})
export class JsModule {}
