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

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.employerService.getJobOffer(params.get('id')).subscribe((response) => {
          this.jobOfferData = response;
          this.loading = false;
        });
      } else {
        this.loading = false;
      }
    });

    this.employerService.getEmployer().subscribe((response) => {
      this.jobOfferData.employerId = response.id;
    });
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
        if (!this.jobOfferData.id) {
          this.employerService.postJobOffer(this.jobOfferData).subscribe((response) => {
            this.router.navigate(['employer/account']);
          });
        } else {
          this.employerService.putJobOffer(this.jobOfferData).subscribe((response) => {
            this.router.navigate(['employer/job-offer/' + this.jobOfferData.id]);
          });
        }
      } else {
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

      if (result) {
        if (this.jobOfferData.id)
          this.router.navigate(['employer/job-offer/' + this.jobOfferData.id]);
        this.router.navigate(['employer/account']);
      }
    });
  }

  dict: Record<string, string[]> = {
    "industries": this.jobOfferData.industries,
    "localizations": this.jobOfferData.localizations,
    "employmentForms": this.jobOfferData.employmentForms,
    "contractTypes": this.jobOfferData.contractTypes,
    "levels": this.jobOfferData.levels,
  };

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

  optionClicked(option: string, attribute: string) {
    if (!this.dict[attribute].includes(option)) {
      this.dict[attribute].push(option);
    } else {
      var end = false;
      const backup: string[] = []
      for (let i = 0; i < this.dict[attribute].length + backup.length && !end; i++) {
        const elem = this.dict[attribute].pop();
        if (elem == option) {
          const k = backup.length;
          for (let j = 0; j < k; j++) {
            this.dict[attribute].push(<string>backup.pop());
          }
          end = true;
        } else {
          backup.push(<string>elem);
        }

      }
    }

  }


  protected readonly console = console;
}
