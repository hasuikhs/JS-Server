import { Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationGuard } from 'src/auth/auth.guard';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { Server } from 'ws';

@UseGuards(AuthenticationGuard)
@UseInterceptors(LoggingInterceptor)
@WebSocketGateway(3030)
export class WsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('ws')
  onEvent(client: any, data: any): Observable<WsResponse<number>> {
    console.log(data)
    return from([1]).pipe(map(item => ({ event: 'ws', data: item })));
  }
}