import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginData} from "../../types";
import {RequestInterceptor} from "../../interceptors/request.interceptor";
import {shareReplay} from "rxjs/operators";
import { ROUTES} from "../../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  getLoginData() {
    console.log(ROUTES + '/login');
    return this.http.get<LoginData[]>(ROUTES.BACKEND_ROUTE + '/login');
  }

  addLoginData(loginData: LoginData) {
    const route: string  = ROUTES.BACKEND_ROUTE + '/login';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.request('post', route, {
      body: loginData,
      withCredentials: true,
      // headers: headers
    }).pipe(shareReplay(1))
  }


}



