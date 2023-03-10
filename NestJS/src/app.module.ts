import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ApiModule } from './api/api.module';
import { ConfigModule } from '@nestjs/config/dist';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    ApiModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
