import {Component, OnInit} from '@angular/core';
import {EmployerAccount} from "../../types";
import {HttpClient} from "@angular/common/http";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {EmployerService} from "../service/employer.service";

@Component({
  selector: 'app-employer-account',
  templateUrl: './employer-account.component.html',
  styleUrls: ['./employer-account.component.scss']
})
export class EmployerAccountComponent  implements OnInit{


  constructor(private serviceEmployer: EmployerService, private route: ActivatedRoute) {

  }

  employerAccount: EmployerAccount = {
    id: "000001",
    companyName: "Google",
    email: "google@gmail.com",
    telephone: "123456789",
    description:  'kaktus',
    displayDescription: "kaktus ",
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.serviceEmployer.getEmployer().subscribe((response) => {
          this.employerAccount.id = response.id;
          this.employerAccount.companyName = response.companyName;
          this.employerAccount.email = response.email;
          this.employerAccount.telephone = response.telephone;
          this.employerAccount.description = response.description;
          this.employerAccount.displayDescription = response.displayDescription;
          this.employerAccount.photo = response.photo;
          this.employerAccount.addres = response.addres;
      });
    });
  }

}
