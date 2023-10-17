import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {
  SimpleTrueFalsePopUpComponent
} from "../../../utilities/pop-up/simple-true-false-pop-up/simple-true-false-pop-up.component";
import {EmployeeService} from "../../service/employee.service";

@Component({
  selector: 'app-info-form',
  templateUrl: './worker-info-form.component.html',
  styleUrls: ['./worker-info-form.component.scss']
})
export class WorkerInfoFormComponent {


  constructor(public  dialog: MatDialog,
              private router: Router,
              private service: EmployeeService) { }



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
      console.log('The dialog was closed');

      // add logic for saving data

      // add redirecting to client page
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
      console.log('The dialog was closed');

      // add redirecting to client page
      if(result)
        this.router.navigate(['worker/account']);
    });
  }


}
