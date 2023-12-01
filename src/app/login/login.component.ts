import {Component, OnInit} from '@angular/core';
import {LoginService} from "./service/login.service";
import {NgForm} from "@angular/forms";
import {LoginData} from "../types";
import {Router} from "@angular/router";
import {catchError, of, throwError} from "rxjs";
import {VariablesService} from "../utilities/service/variables.service";

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
              private variableService: VariablesService) {
  }

  ngOnInit(): void {
    this.loading = false;
  }

  hide = true;
  loading: boolean = true;
  errorMessage: string = '';

  logIn(loginForm: NgForm) {
    this.loading = true;
    this.loginService.pushLoginData(this.loginData).pipe(
      catchError(err => {
        switch (err.status) {
            case 401:
                console.log('401 Unauthorized');
                this.router.navigate(['/login']);
                this.errorMessage = 'Nieprawidłowy login lub hasło';
                this.loading = false;
                break;
            case 404:
                console.log('404 Not Found');
                this.router.navigate(['/login']);
                this.errorMessage = 'Nieznaleziono strony, poczekaj chwilę i spróbuj ponownie';
                this.loading = false;
                break;
            default:
                console.log('Error');
                this.router.navigate(['/login']);
                this.errorMessage = 'Błąd logowania';
                this.loading = false;
                break;
        }

        //
        // if (err.status === 404) {
        //   console.log('HTTP Error 404: Resource not found');
        // } else {
        //   console.error('HTTP Error', err.status, err.statusText);
        // }
        return throwError(err);
      })
    ).subscribe(response => {
      console.log('Satus: ' + response.status + ' ' + response.statusText);
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
            this.loading = false;
          }
          else{
            this.router.navigate(['/login']);
            this.loading = false;
          }

          break;

        case 401:
          console.log('401 Unauthorized');
          this.router.navigate(['/login']);
          this.errorMessage = 'Nieprawidłowy login lub hasło';
          this.loading = false;
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

}
