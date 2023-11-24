import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginData, RegisterData} from "../../types";
import {RequestInterceptor} from "../../interceptors/request.interceptor";
import {shareReplay} from "rxjs/operators";
import { environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  getLoginData() {
    return this.http.get<LoginData[]>(environment.BACKEND_ROUTE + '/login', {withCredentials: true}).pipe(shareReplay(1));
  }

  pushLoginData(loginData: LoginData) {

    const route: string  = environment.BACKEND_ROUTE + '/login';
    return this.http.request('post', route, {
      body: loginData,
      withCredentials: true,
      responseType: 'text',
      observe: 'response',
    }).pipe(shareReplay(1));
  }

  registerUser(registerData: RegisterData) {
    const route: string  = environment.BACKEND_ROUTE + '/signup';
    return this.http.request('post', route, {
      body: registerData,
      withCredentials: true,
      responseType: 'text',
      observe: 'response',
    }).pipe(shareReplay(1));
  }

  logout() {
    localStorage.setItem('role', '');
    localStorage.setItem('token', '');
    const route: string  = ROUTES.BACKEND_ROUTE + '/logout';
    return this.http.request('post', route, {
      withCredentials: true,
      responseType: 'text',
      observe: 'response',
    }).pipe(shareReplay(1));
  }


  getLinkedinData(): Observable<Object> {
    const route = 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77ebvrc0c0fjtq&redirect_uri=http://localhost:8080/auth/linkedin/callback&state=foobar&scope=openid%20profile%20email';
    console.log(route);
    // return this.http.jsonp(route, 'callback');
    return this.http.get<string>(route, {
      withCredentials: true
    });
  }
//
//   getLinkedinData(): Observable<Object> {
//     const route = 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77ebvrc0c0fjtq&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth%2Flinkedin%2Fcallback&state=foobar&scope=openid%20profile%20email';
//
// // Create custom headers
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//     });
//
// // Create custom callback function
//     const callback = 'callback';
//     window[callback] = (data: any) => {
//       console.log(data);
//     };
//
// // Create script element for JSONP request
//     const script = document.createElement('script');
//     script.src = `${route}&callback=${callback}`;
//     document.body.appendChild(script);
//
//
//     return new Observable(observer => {
// // Cleanup function to remove script element
//       const cleanup = () => {
//         document.body.removeChild(script);
//         // delete window[callback];
//       };
//
// // Handle script load and error events
//       script.onload = () => {
//         observer.next();
//         observer.complete();
//         cleanup();
//       };
//
//       script.onerror = (error: any) => {
//         observer.error(error);
//         cleanup();
//       };
//     });
//   }

}



