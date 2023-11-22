import {Component, OnInit} from '@angular/core';
import {EmployerAccount, ForListBackend, ItemInsideList, JobFair, JobOffer, Page} from "../../types";
import {BehaviorSubject, catchError, Observable, of, startWith} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {JobfairService} from "../services/jobfair.service";
import {PageEvent} from "@angular/material/paginator";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-jobfair',
  templateUrl: './jobfair.component.html',
  styleUrls: ['./jobfair.component.scss']
})
export class JobfairComponent implements OnInit{

  jobFairsState$!: Observable<{ appState: string, appData?: Page<ForListBackend>, error?: HttpErrorResponse }>;
  responseSubject = new BehaviorSubject<Page<ForListBackend>>({} as Page<ForListBackend>);
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();


  constructor(public route: ActivatedRoute,
              private serviceJobFair: JobfairService) {}


  pageEvent?: PageEvent;
  pageSize: number = 5;
  pageIndex: number = 0;
  length: number = 20;
  employersAsList: ItemInsideList[] = [];
  companyPhoto = '../../assets/company.png';
  filters: [string, string][] = [["Minimalne wynagrodzenie", ""], ["Branża", "/industries"]];

  tabs: [key: string, value: boolean][] = [
    ["tab1", true],
    ["tab2", false]
  ]

  changeTab(tab: string) {
      this.tabs.map((elem) => {
          if (elem[0] === tab) {
              elem[1] = true;
          }else{
              elem[1] = false;
          }
      })
  }

  foundValueByNameInTab(tab: string): boolean{
    return this.tabs.filter((elem) => elem[0] === tab)[0][1];
  }

  loading: boolean = true;
  loadingEmployers = true;

  jobFair: JobFair = {
    id: 0,
    name: "",
    organizerId: 0,
    dateStart: "",
    dateEnd: "",
    address: "",
    description: "",
    displayDescription: ""
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.gotToPage(this.jobFair.id,'', e.pageIndex);
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      const jobfairId = Number(params.get('jobfair-id'));
      if(jobfairId){
        this.serviceJobFair.getJobFairById(jobfairId).subscribe((response: JobFair) => {
            this.jobFair.id = response.id;
            this.jobFair.name = response.name;
            this.jobFair.organizerId = response.organizerId;
            this.jobFair.dateStart = this.convertDate(response.dateStart);
            this.jobFair.dateEnd = this.convertDate(response.dateEnd);
            this.jobFair.address = response.address;
            this.jobFair.description = response.description;
            this.jobFair.displayDescription = response.displayDescription;
            this.loading = false;

            console.log( "dateStart: " + this.jobFair.dateStart);
            console.log("dateEnd: " + this.jobFair.dateEnd);
        });

        this.jobFairsState$ = this.serviceJobFair.participationEmployers$(jobfairId).pipe(
            map((response) => {
              console.log(response);
              this.responseSubject.next(response);
              this.currentPageSubject.next(response.number);

              response.content.forEach(
                  (offer) => {
                    this.addEmployerForList(offer);
                  }
              );

              this.loadingEmployers = false;

              return ({appState: 'APP_LOADED', appData: response});
            }),
            startWith({appState: 'APP_LOADED'}),
            catchError((error: HttpErrorResponse) => {
                  return of({appState: 'APP_ERROR', error})
                }
            )
        )
      }
      else{
        this.loading = false;
      }
    });



    this.jobFairsState$.subscribe((response) => {
      this.length = response.appData ? response.appData.totalElements : 0;
      this.pageSize = response.appData ? response.appData.size : 0;
      this.pageIndex = response.appData ? response.appData.number : 0;
    });
  }

  addEmployerForList(employer: ForListBackend): void {
    const role = localStorage.getItem('role');
    let employerAsItemInsideList: ItemInsideList = {
      route: "/employer/"+employer.id+"/account",
      image: employer.photo ? employer.photo : this.companyPhoto,
      name: employer.name,
      id: employer.id ? employer.id : 0,
      displayDescription: `${employer.displayDescription}`,
      useSaved: false,
      isSaved: false,
      useDelete: false
    }
    console.log("Route: " + employerAsItemInsideList.route);
    this.employersAsList.push(employerAsItemInsideList);
  }

  gotToPage(jobfairId: number ,name?: string, pageNumber: number = 0): void {
    this.employersAsList = [];
    this.loadingEmployers = true;
    this.jobFairsState$ = this.serviceJobFair.participationEmployers$(jobfairId, pageNumber, this.pageSize).pipe(
        map((response: Page<ForListBackend>) => {

          this.responseSubject.next(response);
          this.currentPageSubject.next(response.number);

          response.content.forEach(
              (employerForList) => {
                this.addEmployerForList(employerForList);
              }
          );
          this.loadingEmployers = false;
          console.log(response);
          return ({appState: 'APP_LOADED', appData: response});
        }),
        startWith({appState: 'APP_LOADED', appData: this.responseSubject.value}),
        catchError((error: HttpErrorResponse) => {
              return of({appState: 'APP_ERROR', error})
            }
        )
    )

  }

  convertDate(date: string): string{
    return date.substring(0,10)+" "+date.substring(11);
  }

}
