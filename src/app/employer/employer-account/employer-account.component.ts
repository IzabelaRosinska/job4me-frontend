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
export class EmployerAccountComponent implements OnInit {


    constructor(private serviceEmployer: EmployerService, private route: ActivatedRoute) {

    }

    companyPhoto = '../../assets/company.png';

    employerAccount: EmployerAccount = {
        id: "",
        companyName: "",
        email: "",
        telephone: "",
        description: '',
        displayDescription: "",
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
                this.employerAccount.address = response.address;
                this.convertJobOffersToListType();
            });
        });

    }

    offers: JobOffer[] = [
        {
            id: "111111",
            offerName: "Junior Java Developer",
            company: this.employerAccount,
            industries: ["IT", "Software Development"],
            localizations: ["Warsaw", "Krakow"],
            forms: ["B2B", "UoP"],
            salaryFrom: 5000,
            salaryTo: 7000,
            contractType: ["Full-time", "Part-time"],
            workingTime: "8h",
            level: ["Junior"],
            requirements: ["Java", "Spring", "Hibernate", "SQL"],
            extraSkills: ["Angular", "React", "Vue"],
            duties: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae ali",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl."
        },
        {
            id: "222222",
            offerName: "Junior Python Developer",
            company: this.employerAccount,
            industries: ["IT", "Software Development"],
            localizations: ["Warsaw", "Krakow"],
            forms: ["B2B", "UoP"],
            salaryFrom: 2000,
            salaryTo: 5000,
            contractType: ["Full-time", "Part-time"],
            workingTime: "8h",
            level: ["Junior", "Mid"],
            requirements: ["Python", "Spring", "Hibernate", "SQL"],
            extraSkills: ["Angular", "React", "Vue"],
            duties: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae ali",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl."
        },
        {
            id: "333333",
            offerName: "Junior Java Developer",
            company: this.employerAccount,
            industries: ["IT", "Software Development"],
            localizations: ["Warsaw", "Krakow"],
            forms: ["B2B", "UoP"],
            salaryFrom: 2000,
            salaryTo: 5000,
            contractType: ["Full-time", "Part-time"],
            workingTime: "8h",
            level: ["Junior", "Mid"],
            requirements: ["Java", "Spring", "Hibernate", "SQL"],
            extraSkills: ["Angular", "React", "Vue"],
            duties: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae ali",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl."
        },
        {
            id: "444444",
            offerName: "Junior Python Developer",
            company: this.employerAccount,
            industries: ["IT", "Software Development"],
            localizations: ["Warsaw", "Krakow"],
            forms: ["B2B", "UoP"],
            salaryFrom: 2000,
            salaryTo: 5000,
            contractType: ["Full-time", "Part-time"],
            workingTime: "8h",
            level: ["Junior", "Mid"],
            requirements: ["Python", "Spring", "Hibernate", "SQL"],
            extraSkills: ["Angular", "React", "Vue"],
            duties: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae ali",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl."
        },
    ]
    offersAsList: ItemInsideList[] = [];

    convertJobOffersToListType() {
        this.offers.forEach(offer => {
            let offerAsList: ItemInsideList = {
                route: "/employer/job-offer/" + offer.id,
                image: this.employerAccount.photo ? this.employerAccount.photo : this.companyPhoto,
                name: offer.offerName,
                id: offer.id,
                description: `${offer.industries.join(', ')} \n ${offer.salaryFrom}-${offer.salaryTo} `,
                useFavorite: false,
                isFavorite: false,
                useDelete: true
            }
            this.offersAsList.push(offerAsList);
        })

    }


}
