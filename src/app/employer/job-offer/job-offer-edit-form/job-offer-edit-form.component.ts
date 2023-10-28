import { Component } from '@angular/core';
import {
  SimpleTrueFalsePopUpComponent
} from "../../../utilities/pop-up/simple-true-false-pop-up/simple-true-false-pop-up.component";
import {JobOffer} from "../../../types";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-job-offer-edit-form',
  templateUrl: './job-offer-edit-form.component.html',
  styleUrls: ['./job-offer-edit-form.component.scss']
})
export class JobOfferEditFormComponent {

  invalidClassName: string = "invalid-module";
  validClassName: string = "valid-module";
  constructor(public  dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute,
              private http: HttpClient) { }

  jobOfferData: JobOffer = {
    id: "8436248",
    name: "Junior Java Developer",
    company: {  id: "000001", companyName: "Google", email: "google@gmail.com", telephone: "123456789", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ", displayDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et"},
    branches: ["IT", "Software Development"],
    localizations: [],
    forms: ["B2B", "UoP"],
    salaryStart: 5000,
    salaryEnd: 10000,
    contract_type: ["Full-time", "Part-time"],
    working_time: "8h",
    level: [],
    requirements: ["Java", "Spring", "Hibernate", "SQL"],
    extra_skills: ["Angular", "React", "Vue"],
    duties: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae ali",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl."
  }

  validate(isValid: boolean, data: HTMLElement){
    if(isValid){
        data.classList.add("valid-module");
        data.classList.remove("invalid-module");
    }else{
        data.classList.add("invalid-module");
        data.classList.remove("valid-module");
    }
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
