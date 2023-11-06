import {Component, OnInit} from '@angular/core';
import {EmployerAccount, ItemInsideList, JobOffer} from "../../types";
import {HttpClient} from "@angular/common/http";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {EmployerService} from "../service/employer.service";
import {async, Observable} from "rxjs";
import {map} from "rxjs/operators";

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
        id: 0,
        companyName: "",
        email: "",
        telephone: "",
        description: '',
        displayDescription: "",
    }

    size: number = 5;
    page: number = 0;

    offers: JobOffer[] = []
    offersAsList: ItemInsideList[] = [];
    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.serviceEmployer.getEmployer().subscribe((response) => {
                this.employerAccount = response;
            });
        });

        this.serviceEmployer.getJobOffers(this.page,this.size).subscribe((response) => {
            this.offers = response.content as JobOffer[];
            this.offers.forEach((offer) => {
                let offerAsItemInsideList: ItemInsideList = {
                    route: "/employer/job-offer/" + offer.id,
                    image: this.employerAccount.photo ? this.employerAccount.photo : this.companyPhoto,
                    name: offer.offerName,
                    id: offer.id ? offer.id : 0,
                    description: `${offer.industries.join(', ')} \n ${offer.salaryFrom}-${offer.salaryTo}`,
                    useFavorite: false,
                    isFavorite: false,
                    useDelete: true
                }
                this.offersAsList.push(offerAsItemInsideList);
            });
        });

    }



}
