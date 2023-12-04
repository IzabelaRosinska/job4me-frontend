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


  constructor(private serviceEmployer: EmployerService,
              private route: ActivatedRoute,
              private http: HttpClient) {

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
  isOwner: boolean = false;
  role!: string | null;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.role = localStorage.getItem('role');
      this.serviceEmployer.getJobOffer(params.get('job-offer-id')).subscribe((response) => {
        this.jobOfferData = response;
        console.log("Response: ", response);
        this.route.url.subscribe((url) => {
          console.log(url);
          if(url.length == 3 && this.role=="employer"){
            this.isOwner = true;
            this.serviceEmployer.getEmployer().subscribe((responseEmployer) => {
              this.employerAccountData = responseEmployer;
              this.loading = false;
              console.log(this.isOwner);
            });
          }else if(this.role){
            this.serviceEmployer.getEmployerByIdAuthenticated(response.employerId, this.role).subscribe((responseEmployer) => {
              this.employerAccountData = responseEmployer;
              this.loading = false;
            });
          }
          else {
            this.serviceEmployer.getEmployerById(response.employerId,).subscribe((responseEmployer) => {
              this.employerAccountData = responseEmployer;
              this.loading = false;
            });
          }
        });
      });
    });
  }

  activatedOffer(){
    if(!this.jobOfferData.id) return;
    this.loading = true;
    this.serviceEmployer.activateJobOffer(this.jobOfferData.id).subscribe((response) => {
      this.jobOfferData.isActive = true;
      this.loading = false;
    });
  }

  deactivatedOffer(){
    if(!this.jobOfferData.id) return;
    this.loading = true;
    this.serviceEmployer.deactivateJobOffer(this.jobOfferData.id).subscribe((response) => {
      this.jobOfferData.isActive = false;
      this.loading = false;
    });
  }


}
