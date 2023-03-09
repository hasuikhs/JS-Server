import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { JsModule } from './js/js.module';

@Module({
  imports: [
    JsModule,
    RouterModule.register([
      {
        path: 'api',
        module: ApiModule,
        children: [
          {
            path: 'js',
            module: JsModule
          }
        ]
      }
    ])
  ],
  controllers: [ApiController],
  providers: [ApiService]
})
export class ApiModule {}
