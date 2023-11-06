import {Component, OnInit} from '@angular/core';
import {EmployerAccount, JobOffer} from "../../types";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {EmployerService} from "../service/employer.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-job-offer',
  templateUrl: './job-offer.component.html',
  styleUrls: ['./job-offer.component.scss']
})
export class JobOfferComponent implements OnInit {


  constructor(private serviceEmployer: EmployerService, private route: ActivatedRoute, private http: HttpClient) {

  }

  jobOfferData: JobOffer = {
    offerName: "",
    employerId: 0,
    industries: [],
    localizations: [],
    employmentForms: [],
    salaryFrom: 0,
    salaryTo: 0,
    contractTypes: [""],
    workingTime: "",
    levels: [""],
    requirements: [""],
    extraSkills: [""],
    duties: "",
    description: ""
  }

  employerAccountData?: EmployerAccount;


  ngOnInit(): void {
    // this.route.paramMap.subscribe((params: ParamMap) => {
    // });

    this.serviceEmployer.getJobOffer().subscribe((response) => {
      this.jobOfferData = response;
    });

    this.serviceEmployer.getEmployer().subscribe((response) => {
      this.employerAccountData = response;
    });


  }
}
