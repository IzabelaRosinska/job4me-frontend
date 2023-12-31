import {Component, OnInit} from '@angular/core';
import {RegisterData, Role} from "../../types";
import {LoginService} from "../service/login.service";
import {catchError, throwError} from "rxjs";
import {
  SimpleTrueFalsePopUpComponent
} from "src/app/utilities/pop-up/simple-true-false-pop-up/simple-true-false-pop-up.component";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  passwordVisible: string = 'password';
  visibilityIconClass: string = 'fa fa-eye-slash';

  matchingPasswordVisible: string = 'password';
  visibilityMaatchingPassowrdIconClass: string = 'fa fa-eye-slash';

  loading: boolean = true;

  wrongUsernameMessage: boolean = false;
  errorMessage: string = '';
  is_second_password_same = true;

  registerData: RegisterData = {
    username: '',
    password: '',
    role: 'EMPLOYEE',
    matchingPassword: ''
  }

  constructor(public dialog: MatDialog,
              private loginService: LoginService,
              private router: Router,
              ) {

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

  ngOnInit(): void {
    this.loading = false;
  }

  create_account(): void {
    
        this.loading = true;
        this.loginService.registerUser(this.registerData).pipe(
          catchError(err => {
            switch (err.status) {
              case 401:
                this.errorMessage = 'Nieprawidłowy login lub hasło';
                this.loading = false;
                break;
              case 404:
                this.errorMessage = 'Nieznaleziono strony, poczekaj chwilę i spróbuj ponownie';
                this.loading = false;
                break;
              default:
                this.errorMessage = 'Taki email już istnieje';
                this.loading = false;
                break;
            }
            return throwError(err);
          })
        ).subscribe((response) => {
      switch (response.status) {
        case 201:
          const dialogRef = this.dialog.open(SimpleTrueFalsePopUpComponent, {
            data:
              {
                title: "Weryfikacja",
                mainMessage: "Wysłano mail weryfikacyjny na wskazany adres mailowy.\nAby zakończyć rejestrację użyj linku zamieszczonego w wiadmości.\nJeśli nie możesz znaleźć maila sprawdź folder SPAM.",
                confirmMessage: "OK",
                declineMessage: ""
              }
          });
          this.router.navigate(['/title-page']);
      }
    });
  }
}
