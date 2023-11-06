import {Component, OnInit} from '@angular/core';
import {ApiResponse, EmployerAccount, ItemInsideList, JobOffer, Page} from "../../types";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {EmployerService} from "../service/employer.service";
import {async, BehaviorSubject, catchError, Observable, of, startWith} from "rxjs";
import {map} from "rxjs/operators";
import {PageEvent} from "@angular/material/paginator";

@Component({
    selector: 'app-employer-account',
    templateUrl: './employer-account.component.html',
    styleUrls: ['./employer-account.component.scss']
})
export class EmployerAccountComponent implements OnInit {

    jobOffersState$!: Observable<{ appState: string, appData?: Page<JobOffer>, error?: HttpErrorResponse }>;
    responseSubject = new BehaviorSubject<Page<JobOffer>>({} as Page<JobOffer>);
    private currentPageSubject = new BehaviorSubject<number>(0);
    currentPage$ = this.currentPageSubject.asObservable();
    constructor(private serviceEmployer: EmployerService, private route: ActivatedRoute) {

    }

    companyPhoto = '../../assets/company.png';

    employerAccount: EmployerAccount = {
        id: 0,
        companyName: "",
        contactEmail: "",
        telephone: "",
        description: '',
        displayDescription: "",
    }

    pageSize: number = 5;
    pageIndex: number = 0;
    length: number = 20;

    pageEvent?: PageEvent;
    offersAsList: ItemInsideList[] = [];

    lodaingAccount: boolean = true;
    lodaingOffers: boolean = true;

    addJobOfferForList(offer: JobOffer): void {
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
    }
    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.serviceEmployer.getEmployer().subscribe((response) => {
                this.employerAccount = response;
                this.lodaingAccount = false;
            });
        });

        this.jobOffersState$ = this.serviceEmployer.jobOffers$().pipe(
            map((response) => {
                this.responseSubject.next(response);
                this.currentPageSubject.next(response.number);

                response.content.forEach(
                    (offer) => {
                        this.addJobOfferForList(offer);
                    }
                );

                return ({ appState: 'APP_LOADED', appData: response });
            }),
            startWith({ appState: 'APP_LOADED'}),
            catchError((error: HttpErrorResponse) =>{
                return of({ appState: 'APP_ERROR', error })}
            )
        )

        this.jobOffersState$.subscribe((response) => {
            this.length = response.appData ? response.appData.totalElements : 0;
            this.pageSize = response.appData ? response.appData.size : 0;
            this.pageIndex = response.appData ? response.appData.number : 0;
        });
        this.lodaingOffers = false;
    }


    handlePageEvent(e: PageEvent) {
        this.pageEvent = e;
        this.length = e.length;
        this.pageSize = e.pageSize;
        this.pageIndex = e.pageIndex;
        this.gotToPage('', e.pageIndex);
    }


    gotToPage(name?: string, pageNumber: number = 0): void {
        this.offersAsList = [];
        this.lodaingOffers = true;
        this.jobOffersState$ = this.serviceEmployer.jobOffers$(pageNumber,this.pageSize).pipe(
            map((response: Page<JobOffer>) => {

                this.responseSubject.next(response);
                this.currentPageSubject.next(response.number);

                response.content.forEach(
                    (offer) => {
                        this.addJobOfferForList(offer);
                    }
                );
                this.lodaingOffers = false;
                console.log(response);
                return ({ appState: 'APP_LOADED', appData: response });
            }),
            startWith({ appState: 'APP_LOADED', appData: this.responseSubject.value }),
            catchError((error: HttpErrorResponse) =>{
                return of({ appState: 'APP_ERROR', error })}
            )
        )

        this.jobOffersState$.subscribe((response) => {

        });

    }

    goToNextOrPreviousPage(direction?: string, name?: string): void {
        this.gotToPage(name, direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1);
    }



}
