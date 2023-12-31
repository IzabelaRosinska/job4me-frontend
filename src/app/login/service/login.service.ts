import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginData, PasswordChange, RegisterData} from "../../types";
import {RequestInterceptor} from "../../interceptors/request.interceptor";
import {shareReplay} from "rxjs/operators";
import { ROUTES} from "../../../environments/environments";
import {VariablesService} from "../../utilities/service/variables.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
              private variablesService: VariablesService) {
  }

  getLoginData() {
    return this.http.get<LoginData[]>(ROUTES.BACKEND_ROUTE + '/login', {withCredentials: true}).pipe(shareReplay(1));
  }

  pushLoginData(loginData: LoginData) {

    const route: string  = ROUTES.BACKEND_ROUTE + '/login';
    return this.http.request('post', route, {
      body: loginData,
      withCredentials: true,
      responseType: 'text',
      observe: 'response',
    }).pipe(shareReplay(1));
  }

  registerUser(registerData: RegisterData) {
    const route: string  = ROUTES.BACKEND_ROUTE + '/signup';
    return this.http.request('post', route, {
      body: registerData,
      withCredentials: true,
      responseType: 'text',
      observe: 'response',
    }).pipe(shareReplay(1));
  }

  startChangingPassword(email: string) {
    const route: string  = ROUTES.BACKEND_ROUTE + '/reset-password?email=' + email;
    return this.http.request('post', route, {
      withCredentials: true,
      responseType: 'text',
      observe: 'response',
    }).pipe(shareReplay(1));
  }

  updatePassword(passwordData: PasswordChange) {
    const token = passwordData.token?  '?token='+ passwordData.token  : ''
    const route: string  = ROUTES.BACKEND_ROUTE + '/password-update' + token;
    return this.http.request('post', route, {
      body: passwordData,
      withCredentials: true,
      responseType: 'text',
      observe: 'response',
    }).pipe(shareReplay(1));
  }

  logout() {
    localStorage.setItem('role', '');
    localStorage.setItem('token', '');

    this.variablesService.clearVariables();

    const route: string  = ROUTES.BACKEND_ROUTE + '/logout';
    return this.http.request('post', route, {
      withCredentials: true,
      responseType: 'text',
      observe: 'response',
    }).pipe(shareReplay(1));
  }


}



