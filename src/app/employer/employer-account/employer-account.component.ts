import {Component, OnInit} from '@angular/core';
import {EmployerAccount, FiliterType, ItemInsideList, JobOffer, Page} from "../../types";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {EmployerService} from "../service/employer.service";
import {BehaviorSubject, catchError, Observable, of, startWith} from "rxjs";
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

  constructor(private serviceEmployer: EmployerService,
              private route: ActivatedRoute,
              private router: Router) {
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

  filters: FiliterType[] = [FiliterType.offerName, FiliterType.salaryFrom, FiliterType.salaryTo, FiliterType.industryNames, FiliterType.employmentFormNames];

  loadingAccount: boolean = true;
  loadingOffers: boolean = true;
  isOwner: boolean = false;

  addJobOfferForList(offer: JobOffer): void {
    let offerAsItemInsideList: ItemInsideList = {
      route: "/employer/job-offer/" + offer.id,
      image: this.employerAccount.photo ? this.employerAccount.photo : this.companyPhoto,
      name: offer.offerName,
      id: offer.id ? offer.id : 0,
      displayDescription: `${offer.industries.join(', ')} \n ${offer.salaryFrom}-${offer.salaryTo}`,
      ListButtonsOptions: {
        useSaved: false,
        isSaved: false,
        useDelete: true,
        useGettingInside: true,
        useApprove: false
      }
    }
    this.offersAsList.push(offerAsItemInsideList);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const role = localStorage.getItem('role');
      if (params.get('employer-id') && role) {
        this.serviceEmployer.getEmployerById(params.get('employer-id'), role).subscribe((response) => {
          this.employerAccount = response;
          this.loadingAccount = false;
        });
      } else {
        this.serviceEmployer.getEmployer().subscribe((response) => {
          this.employerAccount = response;
          if (!this.employerAccount.companyName || !this.employerAccount.contactEmail || !this.employerAccount.telephone
            || !this.employerAccount.description || !this.employerAccount.displayDescription) {
            // this.router.navigate(['employer/editInfo']);
          }
          this.loadingAccount = false;
          this.isOwner = true;
        });
      }
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

        this.loadingOffers = false;

        return ({appState: 'APP_LOADED', appData: response});
      }),
      startWith({appState: 'APP_LOADED'}),
      catchError((error: HttpErrorResponse) => {
          return of({appState: 'APP_ERROR', error})
        }
      )
    )

    this.jobOffersState$.subscribe((response) => {
      this.length = response.appData ? response.appData.totalElements : 0;
      this.pageSize = response.appData ? response.appData.size : 0;
      this.pageIndex = response.appData ? response.appData.number : 0;
    });
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
    this.loadingOffers = true;
    this.jobOffersState$ = this.serviceEmployer.jobOffers$(pageNumber, this.pageSize).pipe(
      map((response: Page<JobOffer>) => {

        this.responseSubject.next(response);
        this.currentPageSubject.next(response.number);

        response.content.forEach(
          (offer) => {
            this.addJobOfferForList(offer);
          }
        );
        this.loadingOffers = false;
        console.log(response);
        return ({appState: 'APP_LOADED', appData: response});
      }),
      startWith({appState: 'APP_LOADED', appData: this.responseSubject.value}),
      catchError((error: HttpErrorResponse) => {
          return of({appState: 'APP_ERROR', error})
        }
      )
    )

    this.jobOffersState$.subscribe((response) => {

    });
  }

  deleteJobOffer(id: number): void {
    this.serviceEmployer.deleteJobOffer(id).subscribe((response) => {
      this.gotToPage();
    });
  }

  print(text: string) {
    console.log(text)
  }


}
