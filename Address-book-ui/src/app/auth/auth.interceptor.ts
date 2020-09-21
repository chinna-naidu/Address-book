import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { exhaustMap} from 'rxjs/operators'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authService.user.pipe(
      exhaustMap(user => {
        if(!user) {
          return next.handle(request);
        } else {
          const modifiedRequest = request.clone({
            headers: new HttpHeaders().append('Authorization',user.token),
          });
          return next.handle(modifiedRequest);
        }
      }))
  }
}
