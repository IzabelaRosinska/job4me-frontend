import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {CookieService} from "ngx-cookie-service";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const jwtToken = localStorage.getItem('token');

    if (jwtToken!=null && jwtToken!=undefined && jwtToken!='') {
      const newRequest = request.clone({
        // setHeaders: {
        //   Authorization: jwtToken,
        // },
        withCredentials: true
      });
      newRequest.headers.keys().forEach(header => newRequest.headers.delete(header));
      console.log("newRequest: " + newRequest.headers.keys());
      return next.handle(newRequest);
    }else{
      const newRequest = request.clone({
        withCredentials: true
      });
      newRequest.headers.keys().forEach(header => newRequest.headers.delete(header));
      console.log("newRequest: " + newRequest.headers.keys());
      return next.handle(newRequest);
    }
  }
}
