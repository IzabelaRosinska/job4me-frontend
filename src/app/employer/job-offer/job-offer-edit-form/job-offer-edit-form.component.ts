import {Component, OnInit} from '@angular/core';
import {
  SimpleTrueFalsePopUpComponent
} from "../../../utilities/pop-up/simple-true-false-pop-up/simple-true-false-pop-up.component";
import {EmployerAccount, JobOffer} from "../../../types";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {EmployerService} from "../../service/employer.service";


@Component({
  selector: 'app-job-offer-edit-form',
  templateUrl: './job-offer-edit-form.component.html',
  styleUrls: ['./job-offer-edit-form.component.scss']
})
export class JobOfferEditFormComponent implements OnInit{

  invalidClassName: string = "invalid-module";
  validClassName: string = "valid-module";

  employerAccountData?: EmployerAccount;
  constructor(public  dialog: MatDialog,
              private router: Router,
              private employerService: EmployerService,
              private route: ActivatedRoute,
              private http: HttpClient) { }

  jobOfferData: JobOffer = {
    offerName: "Java Developer",
    employerId: 0,
    industries: ['IT'],
    localizations: ['Wrocław', 'Warszawa' ],
    employmentForms: ['praca zdalna'],
    salaryFrom: 10000,
    salaryTo: 12500,
    contractTypes: ['B2B'],
    workingTime: "8h",
    levels: ['Junior','Senior'],
    requirements: ['Java', 'Spring', 'Hibernate', 'SQL'],
    extraSkills: ['Ut varius tempus tellus, sed luctus nibh. Etiam ornare ',
        'Integer id metus euismod, imperdiet dui non, egestas elit. '],
    duties: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ex purus, tincidunt nec posuere vitae, placerat quis" +
        " ante. Etiam nisl dolor, aliquet sed accumsan ut, mollis ac velit. Phasellus sodales est vitae lorem dignissim, non" +
        " fringilla urna volutpat. Suspendisse potenti. Ut maximus magna ex, ac sodales libero cursus non. Proin ut tortor eu" +
        " felis molestie vulputate sit amet in massa. Nunc est leo, condimentum sit amet condimentum vel, rutrum et odio. Proin" +
        " facilisis orci a metus congue, vel condimentum nisl tempor. Quisque sed lectus quis tellus accumsan scelerisque eget ",
    description: "\n" +
        "Suspendisse sed efficitur tellus. Fusce ullamcorper est at magna fermentum, at fringilla tortor fringilla. " +
        "Vestibulum commodo felis non nulla luctus elementum. Fusce mollis neque enim, at blandit orci lacinia non. Sed" +
        " suscipit vitae turpis et elementum. Curabitur sed turpis a nisl condimentum imperdiet quis vel eros. Donec " +
        "iaculis urna eget nisl malesuada aliquam. Duis tincidunt maximus eros, vitae pulvinar enim lacinia vitae. "

  }

    // id: "",
    // offerName: "",
    // company: "",
    // industries: [],
    // localizations: [],
    // forms: [],
    // salaryFrom: 0,
    // salaryTo: 0,
    // contractType: [],
    // workingTime: "",
    // level: [],
    // requirements: [],
    // extraSkills: [],
    // duties: "",
    // description: ""
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

        // add redirecting to client page
          if(result){
              if(this.jobOfferData.id)
                  this.router.navigate(['employer/job-offer/'+this.jobOfferData.id]);
              this.router.navigate(['employer/account']);
          }
      });
  }

    ngOnInit(): void {
      this.employerService.getEmployer().subscribe((response) => {
            this.jobOfferData.employerId = response.id;
      });
    }
}
