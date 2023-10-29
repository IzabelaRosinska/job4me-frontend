import { Component } from '@angular/core';
import {JobOffer} from "../../types";

@Component({
  selector: 'app-job-offer',
  templateUrl: './job-offer.component.html',
  styleUrls: ['./job-offer.component.scss']
})
export class JobOfferComponent {

  jobOfferData: JobOffer = {
    id: "8436248",
    offerName: "Junior Java Developer",
    company: {  id: "000001", companyName: "Google", email: "google@gmail.com", telephone: "123456789", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ",displayDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et '},
    industries: ["IT", "Software Development"],
    localizations: ["Warsaw", "Krakow"],
    forms: ["B2B", "UoP"],
    salaryFrom: 5000,
    salaryTo: 10000,
    contractType: ["Full-time", "Part-time"],
    workingTime: "8h",
    level: ["Junior",'Mid'],
    requirements: ["Java", "Spring", "Hibernate", "SQL"],
    extraSkills: ["Angular", "React", "Vue"],
    duties: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae ali",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl."
  }


  constructor() { }
}
