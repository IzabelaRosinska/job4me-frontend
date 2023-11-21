import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const jwtToken = localStorage.getItem('token');
    // console.log("Jwt: " + jwtToken);
    console.log(request)
    if (jwtToken!=null && jwtToken!=undefined && jwtToken!='') {
      const newRequest = request.clone({
        setHeaders: {
          Authorization: jwtToken,
        },
        withCredentials: true
      });
      return next.handle(newRequest);
    }else{
      const newRequest = request.clone({
        withCredentials: true
      });
      return next.handle(newRequest);
    }
  }
}
