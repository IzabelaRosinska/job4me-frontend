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
                this.employerAccount = response;
            });
        });

        this.serviceEmployer.getJobOffers().subscribe((response) => {
            this.offers = response;
            for(let i = 0; i < this.offers.length; i++) {
                let offer = this.offers[i];
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
            }

        });

    }

    offers: JobOffer[] = []
    offersAsList: ItemInsideList[] = [];

    convertJobOffersToListType() {


    }


}
