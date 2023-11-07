import {Component, OnInit} from '@angular/core';
import {LoginService} from "./service/login.service";
import {NgForm} from "@angular/forms";
import {LoginData} from "../types";
import {Router} from "@angular/router";
import {catchError, of, throwError} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  passwordVisible: string = 'password';
  visibilityIconClass: string = 'fa fa-eye-slash';

  loginData: LoginData = {
    username: '',
    password: ''
  }

  constructor(private loginService: LoginService,  private router:  Router) {}

  ngOnInit(): void {}

  logIn(loginForm: NgForm) {

    this.loginService.pushLoginData(this.loginData).pipe(
        catchError(err => {
          if (err.status === 404) {
            console.log('HTTP Error 404: Resource not found');
          } else {
            console.error('HTTP Error', err.status, err.statusText);
          }
          return throwError(err);
        })
    ).subscribe(response => {
      switch (response.status) {
        case 200:
          const role = response.body?.toLowerCase().replace('_enabled','');
          localStorage.setItem('role', role? role : '');
          this.router.navigate(['/' + role +'/account']);
          break;
      }
      loginForm.resetForm({
        username: '',
        password: ''
      });
    });
  }

  togglePassowrdVisibility() {
    if(this.passwordVisible == 'password')
    {
      this.passwordVisible = 'text';
      this.visibilityIconClass = 'fa fa-eye';
    }
    else
    {
      this.passwordVisible = 'password';
      this.visibilityIconClass = 'fa fa-eye-slash';
    }
  }

}
