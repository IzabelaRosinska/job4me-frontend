import {Component, OnInit} from '@angular/core';
import {
  SimpleTrueFalsePopUpComponent
} from "../../../utilities/pop-up/simple-true-false-pop-up/simple-true-false-pop-up.component";
import {catchError} from "rxjs";
import {OrganizerAccount} from "../../../types";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {OrganizerService} from "../../service/organizer.service";

@Component({
  selector: 'app-organizer-info-form',
  templateUrl: './organizer-info-form.component.html',
  styleUrls: ['./organizer-info-form.component.scss']
})
export class OrganizerInfoFormComponent implements OnInit {

  constructor(public dialog: MatDialog,
              private router: Router,
              private serviceOrganizer: OrganizerService,
              private route: ActivatedRoute
  ) {
  }

  register: boolean = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.serviceOrganizer.getOrganizer().subscribe((response) => {
        this.organizerAccount.id = response.id;
        this.organizerAccount.name = response.name;
        this.organizerAccount.contactEmail = response.contactEmail;
        this.organizerAccount.telephone = response.telephone;
        this.organizerAccount.description = response.description;

        if(this.organizerAccount.name == "" || this.organizerAccount.contactEmail == "" || this.organizerAccount.telephone == "" || this.organizerAccount.description == "" ||
        this.organizerAccount.name == null || this.organizerAccount.contactEmail == null || this.organizerAccount.telephone == null || this.organizerAccount.description == null){
          this.register = true;
          console.log("Register: "+this.register)
        }
      });
    });
  }

  organizerAccount: OrganizerAccount = {
    id: 0,
    name: "",
    contactEmail: "",
    telephone: "",
    description: "",
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
        this.serviceOrganizer.postOrganizer(this.organizerAccount).pipe(
          catchError((err) => {
            return [];
          })
        ).subscribe((response) => {
          this.router.navigate(['organizer/account']);
        });
      }
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

      if (result)
        this.router.navigate(['organizer/account']);
    });
  }

}
