import { Module } from '@nestjs/common';
import { JsService } from './js.service';

@Module({
  providers: [JsService]
})
export class JsModule {}
