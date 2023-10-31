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
            // Handle the 404 error here
            console.log('HTTP Error 404: Resource not found');
          } else {
            // Handle other errors here
            console.error('HTTP Error', err.status, err.statusText);
          }

          // Rethrow the error to allow the subscription to handle it further
          return throwError(err);
        })
    ).subscribe(response => {
      switch (response.status) {
        case 200:
            localStorage.setItem('role', response.body?.toLowerCase() ? response.body?.toLowerCase() : '');
            this.router.navigate(['/' + response.body?.toLowerCase() +'/account']);
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
