import { Component } from '@angular/core';
import {LoginData, RegisterData, Role} from "../../types";
import {LoginService} from "../service/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  passwordVisible: string = 'password';
  visibilityIconClass: string = 'fa fa-eye-slash';

  matchingPasswordVisible: string = 'password';
  visibilityMaatchingPassowrdIconClass: string = 'fa fa-eye-slash';

  registerData: RegisterData = {
    username: '',
    password: '',
    role: 'employee',
    matchingPassword: ''
  }

  constructor(private loginService: LoginService,
              private router: Router) {

  }

  registerUser(){
    this.loginService.registerUser(this.registerData).subscribe((response) => {
      console.log(response);
      switch (response.status) {
        case 201:

          switch (this.registerData.role) {
            case 'EMPLOYEE':
              this.router.navigate(['/worker/editInfo']);
              break;
            case 'EMPLOYER':
              this.router.navigate(['/employer/editInfo']);
              break;
            case 'ORGANIZER':
              this.router.navigate(['/organizer/editInfo']);
              break;
          }
          break;
      }
    })
  }

  togglePassowrdVisibility(isMatchingPassword: boolean) {
    if(isMatchingPassword)
    {
      if(this.matchingPasswordVisible == 'password')
      {
        this.matchingPasswordVisible = 'text';
        this.visibilityMaatchingPassowrdIconClass = 'fa fa-eye';
      }
      else
      {
        this.matchingPasswordVisible = 'password';
        this.visibilityMaatchingPassowrdIconClass = 'fa fa-eye-slash';
      }
      return;
    }else
    {
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

  protected readonly Role = Role;
}
