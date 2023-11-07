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
    duties: "",
    description: ""
  }

  companyPhoto = '../../assets/company.png';
  employerAccountData?: EmployerAccount;
  loading: boolean = true;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.serviceEmployer.getJobOffer(params.get('id')).subscribe((response) => {
        this.jobOfferData = response;
        this.loading = false;
        console.log(this.jobOfferData);
      });
    });

    this.serviceEmployer.getEmployer().subscribe((response) => {
      this.employerAccountData = response;
    });


  }
}
