import { Component } from '@angular/core';
import {LoginData, RegisterData, Role} from "../../types";
import {LoginService} from "../service/login.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {catchError} from "rxjs";

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

  wrongUsernameMessage: boolean = false;

  registerData: RegisterData = {
    username: '',
    password: '',
    role: 'EMPLOYEE',
    matchingPassword: ''
  }

  constructor(private loginService: LoginService,
              private router: Router) {

  }

  registerUser(registerForm: NgForm){
    this.loginService.registerUser(this.registerData).subscribe((response) => {
      console.log(response);
      switch (response.status) {
        case 201:

          switch (this.registerData.role) {
            case 'EMPLOYEE':
              this.router.navigate(['/employee/editInfo']);
              break;
            case 'EMPLOYER':
              this.router.navigate(['/employer/editInfo']);
              break;
            case 'ORGANIZER':
              this.router.navigate(['/organizer/editInfo']);
              break;
          }
          break;
        case 500:
          registerForm.resetForm({
            username: '',
            password: '',
            matchingPassword: ''
          });

          this.wrongUsernameMessage = true;
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
