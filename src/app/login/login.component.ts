import {Component, OnInit} from '@angular/core';
import {LoginService} from "./service/login.service";
import {NgForm} from "@angular/forms";
import {LoginData} from "../types";

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

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}

  logIn(loginForm: NgForm) {
    this.loginService.pushLoginData(this.loginData).subscribe((data) => {
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
