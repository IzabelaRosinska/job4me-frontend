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
import {VariablesService} from "../../../utilities/service/variables.service";
import {FormControl} from "@angular/forms";


@Component({
  selector: 'app-job-offer-edit-form',
  templateUrl: './job-offer-edit-form.component.html',
  styleUrls: ['./job-offer-edit-form.component.scss']
})
export class JobOfferEditFormComponent implements OnInit {

  invalidClassName: string = "invalid-module";
  validClassName: string = "valid-module";

  constructor(public dialog: MatDialog,
              private router: Router,
              private employerService: EmployerService,
              private route: ActivatedRoute,
              public variableService: VariablesService) {

    variableService.initVariables();
  }


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

  createForm: boolean = false;
  is_submit_failed = false

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      if (params.get('job-offer-id')) {
        this.employerService.getJobOffer(params.get('job-offer-id')).subscribe((response) => {
          this.jobOfferData = response;
          this.loading = false;
        });
      } else {
        this.loading = false;
        this.createForm = true;
      }
    });

    this.employerService.getEmployer().subscribe((response) => {
      this.jobOfferData.employerId = response.id;
    });
  }

  changeContractTypes(option: string) {
    let index = this.jobOfferData.contractTypes.indexOf(option);
    if (index !== -1) {
      this.jobOfferData.contractTypes.splice(index, 1)
    }
    else {
      this.jobOfferData.contractTypes.push(option)
    }
  }

  changeIndustry(option: string) {
    let index = this.jobOfferData.industries.indexOf(option);
    if (index !== -1) {
      this.jobOfferData.industries.splice(index, 1)
    }
    else {
      this.jobOfferData.industries.push(option)
    }
  }

  changeLevels(option: string) {
    let index = this.jobOfferData.levels.indexOf(option);
    if (index !== -1) {
      this.jobOfferData.levels.splice(index, 1)
    }
    else {
      this.jobOfferData.levels.push(option)
    }
  }

  changeEmploymentForms(option: string) {
    let index = this.jobOfferData.employmentForms.indexOf(option);
    if (index !== -1) {
      this.jobOfferData.employmentForms.splice(index, 1)
    }
    else {
      this.jobOfferData.employmentForms.push(option)
    }
  }

  validate(isValid: boolean, data: HTMLElement) {
    if (isValid) {
      data.classList.add("valid-module");
      data.classList.remove("invalid-module");
    } else {
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

      if (result) {
        this.loading = true;
        if (!this.jobOfferData.id) {
          this.employerService.postJobOffer(this.jobOfferData).subscribe((response) => {
            this.router.navigate(['employer/account']);
            this.loading = false;
          });
        } else {
          this.employerService.putJobOffer(this.jobOfferData).subscribe((response) => {
            this.router.navigate(['employer/job-offer/' + this.jobOfferData.id]);
            this.loading = false;
          });
        }
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

      if (result) {
        this.loading = true;
        if (this.createForm){
          this.router.navigate(['employer/job-offer/' + this.jobOfferData.id]);
          this.loading = false;
        } else {
          this.router.navigate(['employer/account']);
          this.loading = false;
        }
      }
    });
  }

  moduleSaveInfo(list: string[], id: string) {
    switch (id) {
      case "localizations":
        this.jobOfferData.localizations = list;
        break;
      case "requirements":
        this.jobOfferData.requirements = list;
        break;
      case "extraSkills":
        this.jobOfferData.extraSkills = list;
        break;
    }
  }

  checkSalary(start: number, end: number) {
    return !(end === null || end < start)
  }

  validateSalary() {
    return (this.jobOfferData.salaryFrom !== null && (this.jobOfferData.salaryTo === null || this.jobOfferData.salaryFrom <= this.jobOfferData.salaryTo))

  }

  protected readonly console = console;
}
