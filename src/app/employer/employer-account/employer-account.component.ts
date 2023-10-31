import {Component, OnInit} from '@angular/core';
import {EmployerAccount, ItemInsideList, JobOffer} from "../../types";
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
    this.convertJobOffersToListType();
  }

  companyPhoto = '../../assets/company.png';

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
  offers: JobOffer[] = [
    {
      id: "111111",
      name: "Junior Java Developer",
      company: this.employerAccount,
      branches: ["IT", "Software Development"],
      localizations: ["Warsaw", "Krakow"],
      forms: ["B2B", "UoP"],
      salaryStart: 5000,
      salaryEnd: 7000,
      contract_type: ["Full-time", "Part-time"],
      working_time: "8h",
      level: ["Junior"],
      requirements: ["Java", "Spring", "Hibernate", "SQL"],
      extra_skills: ["Angular", "React", "Vue"],
      duties: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae ali",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl."
    },
    {
      id: "222222",
      name: "Junior Python Developer",
      company:  this.employerAccount,
      branches: ["IT", "Software Development"],
      localizations: ["Warsaw", "Krakow"],
      forms: ["B2B", "UoP"],
      salaryStart: 2000,
      salaryEnd: 5000,
      contract_type: ["Full-time", "Part-time"],
      working_time: "8h",
      level: ["Junior","Mid"],
      requirements: ["Python", "Spring", "Hibernate", "SQL"],
      extra_skills: ["Angular", "React", "Vue"],
      duties: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae ali",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl."
    },
    {
      id: "333333",
      name: "Junior Java Developer",
      company:  this.employerAccount,
      branches: ["IT", "Software Development"],
      localizations: ["Warsaw", "Krakow"],
      forms: ["B2B", "UoP"],
      salaryStart: 2000,
      salaryEnd: 5000,
      contract_type: ["Full-time", "Part-time"],
      working_time: "8h",
      level: ["Junior","Mid"],
      requirements: ["Java", "Spring", "Hibernate", "SQL"],
      extra_skills: ["Angular", "React", "Vue"],
      duties: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae ali",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl."
    },
    {
      id: "444444",
      name: "Junior Python Developer",
      company:  this.employerAccount,
      branches: ["IT", "Software Development"],
      localizations: ["Warsaw", "Krakow"],
      forms: ["B2B", "UoP"],
      salaryStart: 2000,
      salaryEnd: 5000,
      contract_type: ["Full-time", "Part-time"],
      working_time: "8h",
      level: ["Junior","Mid"],
      requirements: ["Python", "Spring", "Hibernate", "SQL"],
      extra_skills: ["Angular", "React", "Vue"],
      duties: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae ali",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl."
    },
    ]
  offersAsList: ItemInsideList[] = [];

  convertJobOffersToListType(){
    this.offers.forEach(offer => {
      let offerAsList: ItemInsideList = {
        route: "/employer/job-offer/" + offer.id,
        image: this.employerAccount.photo? this.employerAccount.photo : this.companyPhoto,
        name: offer.name,
        id: offer.id,
        description: `${offer.branches.join(', ')} \n ${offer.salaryStart}-${offer.salaryEnd} `,
        useFavorite: false,
        isFavorite: false,
        useDelete: true
      }
      this.offersAsList.push(offerAsList);
    })

  }




}
