import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginData} from "../../types";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }




  getLoginData() {
    console.log(this.http.get<LoginData[]>('/login'));
    return this.http.get<LoginData[]>('/login');
  }

  addLoginData(loginData: LoginData) {
    return this.http.post<LoginData[]>('/login', loginData);
  }




}



