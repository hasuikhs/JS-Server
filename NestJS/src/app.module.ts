import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ApiModule } from './api/api.module';
import { ConfigModule } from '@nestjs/config/dist';
import { WsModule } from './ws/ws.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    ApiModule,
    WsModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
