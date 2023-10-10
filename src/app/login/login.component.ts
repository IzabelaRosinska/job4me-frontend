import { Component } from '@angular/core';
import {LoginService} from "./service/login.service";
import {NgForm} from "@angular/forms";
import {LoginData} from "../types";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  passwordVisible: string = 'password';
  visibilityIconClass: string = 'fa fa-eye-slash';

  loginData: LoginData = {
    username: '',
    password: ''
  }

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}

  // AddRoom(roomForm: NgForm)
  // {
  //   this.roomService.addRoom(this.room).subscribe((data) =>
  //
  //     this.successMessage = 'Success!';
  //   roomForm.resetForm({
  //     roomNumber: '',
  //     roomType: '',
  //     amenities: '',
  //     price: 0,
  //     photos: '',
  //     checkinTime: new Date(),
  //     checkoutTime: new Date(),
  //     rating: 0
  //   })
  // })

  putLoginData(loginForm: NgForm) {
    this.loginService.addLoginData(this.loginData).subscribe((data) => {
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
