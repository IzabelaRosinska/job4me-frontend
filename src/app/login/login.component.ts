import {Component, OnInit} from '@angular/core';
import {LoginService} from "./service/login.service";
import {NgForm} from "@angular/forms";
import {LoginData} from "../types";
import {Router} from "@angular/router";
import {catchError, of, throwError} from "rxjs";
import {VariablesService} from "../utilities/service/variables.service";
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  passwordVisible: string = 'password';
  visibilityIconClass: string = 'fa fa-eye-slash';

  loginData: LoginData = {
    username: '',
    password: ''
  }

  constructor(private loginService: LoginService,
              private router: Router,
              private variableService: VariablesService,
              private cookieService: CookieService) {
  }

  ngOnInit(): void {
  }

  hide = true;

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
          this.variableService.initVariables();
          if(response.body){
            const bodyParameters =  response.body?.split(';');
            const role = bodyParameters[0].toLowerCase().replace('_enabled', '');
            const token = bodyParameters[1];

            localStorage.setItem('role', role);
            localStorage.setItem('token', token);

            this.router.navigate(['/' + role + '/account']);
          }
          else{
            this.router.navigate(['/login']);
          }

          break;
      }
      loginForm.resetForm({
        username: '',
        password: ''
      });
    });
  }

  togglePassowrdVisibility() {
    if (this.passwordVisible == 'password') {
      this.passwordVisible = 'text';
      this.visibilityIconClass = 'fa fa-eye';
    } else {
      this.passwordVisible = 'password';
      this.visibilityIconClass = 'fa fa-eye-slash';
    }
  }


  getLinkedin() {
    // this.router.navigate(["www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77ebvrc0c0fjtq&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth%2Flinkedin%2Fcallback&state=foobar&scope=openid%20profile%20email"]);

    this.loginService.getLinkedinData().subscribe((response) => {
      console.log(response);
      // window.location.href = response;
    });
  }

}
