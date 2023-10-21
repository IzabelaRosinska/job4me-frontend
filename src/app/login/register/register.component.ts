import { Component } from '@angular/core';
import {LoginData, RegisterData, Role} from "../../types";
import {LoginService} from "../service/login.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  passwordVisible: string = 'password';
  visibilityIconClass: string = 'fa fa-eye-slash';

  registerData: RegisterData = {
    username: '',
    password: '',
    role: 'employee'
  }

  constructor(private loginService: LoginService) {

  }

  registerUser(){
    this.loginService.registerUser(this.registerData).subscribe((response) => {
      console.log(response);
    })
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

  protected readonly Role = Role;
}
