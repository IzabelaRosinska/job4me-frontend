import {Component, OnInit} from '@angular/core';
import {
  SimpleTrueFalsePopUpComponent
} from "../../../utilities/pop-up/simple-true-false-pop-up/simple-true-false-pop-up.component";
import {EmployerAccount, JobOffer} from "../../../types";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {EmployerService} from "../../service/employer.service";
import {Observable} from "rxjs";


@Component({
  selector: 'app-job-offer-edit-form',
  templateUrl: './job-offer-edit-form.component.html',
  styleUrls: ['./job-offer-edit-form.component.scss']
})
export class JobOfferEditFormComponent implements OnInit{

  invalidClassName: string = "invalid-module";
  validClassName: string = "valid-module";

  constructor(public  dialog: MatDialog,
              private router: Router,
              private employerService: EmployerService,
              private route: ActivatedRoute) { }


  loading: boolean = true;
  jobOfferData: JobOffer = {
      offerName: "",
      employerId: 0,
      industries: [],
      localizations: [],
      employmentForms: [],
      salaryFrom: 0,
      salaryTo: 0,
      contractTypes: [],
      workingTime: "",
      levels: [],
      requirements: [],
      extraSkills: [],
      duties: "",
      description: ""
  }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            if(params.get('id')){
                this.employerService.getJobOffer(params.get('id')).subscribe((response) => {
                    this.jobOfferData = response;
                    this.loading = false;
                });
            }
        });

        this.employerService.getEmployer().subscribe((response) => {
            this.jobOfferData.employerId = response.id;
        });
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

      if(result){
          if(!this.jobOfferData.id){
              this.employerService.postJobOffer(this.jobOfferData).subscribe((response) => {
                  this.router.navigate(['employer/account']);
              });
          }
          else{
                this.employerService.putJobOffer(this.jobOfferData).subscribe((response) => {
                    this.router.navigate(['employer/job-offer/'+this.jobOfferData.id]);
                });
          }
      }
      else{
          this.router.navigate(['employer/account']);
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

          if(result){
              if(this.jobOfferData.id)
                  this.router.navigate(['employer/job-offer/'+this.jobOfferData.id]);
              this.router.navigate(['employer/account']);
          }
      });
  }


}
