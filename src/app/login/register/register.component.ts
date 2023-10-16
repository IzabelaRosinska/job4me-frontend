import { Component } from '@angular/core';
import {LoginData, RegisterData, Role} from "../../types";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  passwordVisible: string = 'password';
  visibilityIconClass: string = 'fa fa-eye-slash';

  registerData: RegisterData = {
    LoginData: {
      username: '',
      password: ''
    },
    role: Role.Employee
  }
  panel: string = 'start';

  constructor() {
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
