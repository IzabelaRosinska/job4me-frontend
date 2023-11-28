import {Component, OnInit} from '@angular/core';
import {RegisterData} from "../../types";
import {NgForm} from "@angular/forms";
import {LoginService} from "../service/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-password-restoring',
  templateUrl: './password-restoring.component.html',
  styleUrls: ['./password-restoring.component.scss']
})
export class PasswordRestoringComponent implements OnInit{

  passwordVisible: string = 'password';
  visibilityIconClass: string = 'fa fa-eye-slash';

  matchingPasswordVisible: string = 'password';
  visibilityMaatchingPassowrdIconClass: string = 'fa fa-eye-slash';

  loading: boolean = true;

  constructor(private loginService: LoginService,
              private router: Router) {

  }


  ngOnInit(): void {
    this.loading = false;
  }

  passwordsData: RegisterData = {
    username: '',
    password: '',
    role: '',
    matchingPassword: ''
  }



  changePassword(registerForm: NgForm){
    this.loading = true;
    // this.loginService.registerUser(this.registerData).subscribe((response) => {
    //   console.log(response);
    //   switch (response.status) {
    //     case 201:
    //
    //       switch (this.registerData.role) {
    //         case 'EMPLOYEE':
    //           this.router.navigate(['/employee/editInfo']);
    //           this.loading = false;
    //           break;
    //         case 'EMPLOYER':
    //           this.router.navigate(['/employer/editInfo']);
    //           this.loading = false;
    //           break;
    //         case 'ORGANIZER':
    //           this.router.navigate(['/organizer/editInfo']);
    //           this.loading = false;
    //           break;
    //       }
    //       break;
    //     case 500:
    //       registerForm.resetForm({
    //         username: '',
    //         password: '',
    //         matchingPassword: ''
    //       });
    //
    //       this.wrongUsernameMessage = true;
    //       this.loading = false;
    //       break;
    //   }
    // })
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


}
