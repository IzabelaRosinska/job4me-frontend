import { Component } from '@angular/core';

@Component({
  selector: 'app-job-offer',
  templateUrl: './job-offer.component.html',
  styleUrls: ['./job-offer.component.scss']
})
export class JobOfferComponent {

  jobOfferData = {
    id: "8436248",
    name: "Junior Java Developer",
    company: "Google",
    branches: ["IT", "Software Development"],
    localizations: ["Warsaw", "Krakow"],
    forms: ["B2B", "UoP"],
    salary: "5000-7000",
    contract_type: ["Full-time", "Part-time"],
    working_time: "8h",
    level: "Junior",
    requirements: ["Java", "Spring", "Hibernate", "SQL"],
    extra_skills: ["Angular", "React", "Vue"],
    duties: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae ali",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl."
  }


  constructor() { }
}
