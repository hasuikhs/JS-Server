import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const headers = [{
      key: 'foo',
      value: 'bar'
    }];
    const cookies = [{
      key: 'test',
      value: 'hi'
    }];
    
    return responseHandler(context, next, headers, cookies, { httpOnly: true });
  }
}

interface Header {
  key: string;
  value: any;
}

interface Cookie {
  key: string;
  value: any;
}

interface CookieOption {
  httpOnly?: boolean;
  secure?: boolean;
}

const responseHandler = (context: ExecutionContext, next: CallHandler<any>, headers: Header[] = [], cookies: Cookie[] = [], option: CookieOption = {}): Observable<any> => {
  return (
    next
      .handle()
      .pipe(
        tap(() => {
          const res = context.switchToHttp().getResponse();

          if (headers.length > 0) {
            headers.forEach(item => {
              res.header(item.key, item.value);
            });
          }

          if (cookies.length > 0) {
            cookies.forEach(item => {
              res.cookie(item.key, item.value, {
                httpOnly: option.httpOnly || false,
                secure: option.secure || false
              });
            });
          }
        })
      )
  );
}