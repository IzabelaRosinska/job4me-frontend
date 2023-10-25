import { Component } from '@angular/core';
import {EmployerAccount} from "../../../types";
import {
  SimpleTrueFalsePopUpComponent
} from "../../../utilities/pop-up/simple-true-false-pop-up/simple-true-false-pop-up.component";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../../../worker/service/employee.service";

@Component({
  selector: 'app-employer-info-form',
  templateUrl: './employer-info-form.component.html',
  styleUrls: ['./employer-info-form.component.scss']
})
export class EmployerInfoFormComponent {


  constructor(public  dialog: MatDialog,
              private router: Router,
              private service: EmployeeService,
              private route: ActivatedRoute) { }


  employerAccountInfo: EmployerAccount = {
    id: "000001",
    companyName: "Google",
    email: "gooooogle@gmail.com",
    telephone: "111333999",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et " +
      "dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." +
      " Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat" +
      " cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

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

      // add logic for saving data

    });



  }

  openDeclineDialog(): void {
    const dialogRef = this.dialog.open(SimpleTrueFalsePopUpComponent, {
      data:
        {
          title: "Odrzuć zmiany ",
          mainMessage: "Czy chcesz odrzucić wprowadzone zmiany?",
          confirmMessage: "Tak",
          declineMessage: "Nie"
        }
    });

    dialogRef.afterClosed().subscribe(result => {

      // add redirecting to client page
      if(result)
        this.router.navigate(['employer/account']);
    });
  }

}
