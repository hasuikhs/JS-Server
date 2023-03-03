import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ApiController } from './api/api.controller';
import { ApiModule } from './api/api.module';
import { RouterModule } from '@nestjs/core';
import { JsModule } from './api/js/js.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    ApiModule,
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
    ]),
    UsersModule
  ],
  controllers: [AppController, AuthController, ApiController],
  providers: [AppService],
})
export class AppModule {}
