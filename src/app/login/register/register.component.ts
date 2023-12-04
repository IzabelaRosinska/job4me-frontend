import {Component, OnInit} from '@angular/core';
import {LoginData, RegisterData, Role} from "../../types";
import {LoginService} from "../service/login.service";
import {NgForm} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {catchError, throwError} from "rxjs";
import {
  SimpleTrueFalsePopUpComponent
} from "src/app/utilities/pop-up/simple-true-false-pop-up/simple-true-false-pop-up.component";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";

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
                // const dialogRef = this.dialog.open(SimpleTrueFalsePopUpComponent, {
                //   data:
                //     {
                //       title: "Weryfikacja",
                //       mainMessage: "Wysłano mail weryfikacyjny na wskazany adres mailowy.\nAby zakończyć rejestrację użyj linku zamieszczonego w wiadmości.\nJeśli nie możesz znaleźć maila sprawdź flder SPAM.",
                //       confirmMessage: "OK",
                //       declineMessage: ""
                //     }
                // });

  }

  

  // registerUser(registerForm: NgForm){
  //   this.loading = true;
  //   this.loginService.registerUser(this.registerData).pipe(
  //       catchError(err => {
  //         switch (err.status) {
  //           case 401:
  //             this.router.navigate(['/login']);
  //             this.errorMessage = 'Nieprawidłowy login lub hasło';
  //             this.loading = false;
  //             break;
  //           case 404:
  //             this.router.navigate(['/login']);
  //             this.errorMessage = 'Nieznaleziono strony, poczekaj chwilę i spróbuj ponownie';
  //             this.loading = false;
  //             break;
  //           default:
  //             this.errorMessage = 'Taki email już istnieje';
  //             this.loading = false;
  //             break;
  //         }
  //         return throwError(err);
  //       }
  //       )
  //   ).subscribe((response) => {
  //     switch (response.status) {
  //       case 201:

  //         switch (this.registerData.role) {
  //           case 'EMPLOYEE':
  //             this.router.navigate(['/employee/editInfo']);
  //             this.loading = false;
  //             break;
  //           case 'EMPLOYER':
  //             this.router.navigate(['/employer/editInfo']);
  //             this.loading = false;
  //             break;
  //           case 'ORGANIZER':
  //             this.router.navigate(['/organizer/editInfo']);
  //             this.loading = false;
  //             break;
  //         }
  //         break;
  //       case 500:
  //         registerForm.resetForm({
  //           username: '',
  //           password: '',
  //           matchingPassword: ''
  //         });

  //         this.wrongUsernameMessage = true;
  //         this.errorMessage = 'Taki email już istnieje!';
  //         this.loading = false;
  //         break;
  //     }
  //   })
  // }



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

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(SimpleTrueFalsePopUpComponent, {
      data:
        {
          title: "Potwierdzenie",
          mainMessage: "Czy chcesz potwierdzić operacje?",
          confirmMessage: "Tak",
          declineMessage: "Nie"
        }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.loading = true;
        this.loginService.registerUser(this.registerData).pipe(
          catchError(err => {
            switch (err.status) {
              case 401:
                this.errorMessage = 'Nieprawidłowy login lub hasło';
                this.loading = false;
                break;
              case 404:
                // this.router.navigate(['/login']);
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
                mainMessage: "Wysłano mail weryfikacyjny na wskazany adres mailowy.\nAby zakończyć rejestrację użyj linku zamieszczonego w wiadmości.\nJeśli nie możesz znaleźć maila sprawdź flder SPAM.",
                confirmMessage: "OK",
                declineMessage: ""
              }
          });
          switch (this.registerData.role) {
            case 'EMPLOYEE':
              this.router.navigate(['/employee/editInfo']);
              this.loading = false;
              break;
            case 'EMPLOYER':
              this.router.navigate(['/employer/editInfo']);
              this.loading = false;
              break;
            case 'ORGANIZER':
              this.router.navigate(['/organizer/editInfo']);
              this.loading = false;
              break;
          }
          break;
      }
    })
      }
    });
  }
}
