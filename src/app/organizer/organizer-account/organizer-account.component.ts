import {Component, OnInit} from '@angular/core';
import {
  ItemInsideList,
  JobFair,
  JobOffer,
  OrganizerAccount,
  Page,
  PaginationUse,
  ParticipationRequest
} from "../../types";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {BehaviorSubject, catchError, Observable, of, startWith} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {EmployerService} from "../../employer/service/employer.service";
import {PageEvent} from "@angular/material/paginator";
import {map} from "rxjs/operators";
import {OrganizerService} from "../service/organizer.service";
import {UtilitiesService} from "../../utilities/service/utilities.service";

@Component({
  selector: 'app-organizer-account',
  templateUrl: './organizer-account.component.html',
  styleUrls: ['./organizer-account.component.scss']
})
export class OrganizerAccountComponent implements OnInit{

  jobFairState$!: Observable<Page<JobFair>>;
  responseSubject = new BehaviorSubject<Page<JobOffer>>({} as Page<JobOffer>);
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();

  loading: boolean = true;

  organizerAccount: OrganizerAccount = {
    id: 0,
    name: "",
    contactEmail: "",
    telephone: "",
    description: "",
  }

  jobFairs: JobFair[] = []
  jobFairsAsList: ItemInsideList[] = []
  companyPhoto = '../../assets/company.png';
  pageSize: number = 5;
  pageIndex: number = 0;
  length: number = 20;

  pageEvent?: PageEvent;

  filters: [string, string][] = [["Minimalne wynagrodzenie", ""], ["Branża", "/industries"], ["Poziomy", "/levels"]];

  isOwner: boolean = false;

  tabs: [key: string, value: boolean][] = [
    ["tab1", true],
    ["tab2", false],
    ["tab3", false]
  ]

  paginationUseList: PaginationUse<any>[] = [
    {
      id: "jobFairs",
      pageSize: 5,
      pageIndex: 0,
      length: 20,
      state: new Observable<Page<JobFair>>(),
      route: "/organizer/jobfair/"
    } as PaginationUse<JobFair>,
    {
      id: "acceptedEmployers",
      pageSize: 5,
      pageIndex: 0,
      length: 20,
      params: "?status=true",
      state: new Observable<Page<ParticipationRequest>>(),
      route: "/organizer/employer-participation"
    } as PaginationUse<ParticipationRequest>,
    {
      id: "pendingEmployers",
      pageSize: 5,
      pageIndex: 0,
      length: 20,
      params: "?status=false",
      state: new Observable<Page<ParticipationRequest>>(),
      route: "/organizer/jobfair/"
    } as PaginationUse<ParticipationRequest>
  ];

  constructor(private serviceOrganizer: OrganizerService,
              private serviceUtilities: UtilitiesService,
              private route: ActivatedRoute) {



  }

  ngOnInit(): void {this.route.paramMap.subscribe((params: ParamMap) => {
    const role = localStorage.getItem('role');
    const organizerId = localStorage.getItem('organizerId');
    if (organizerId && role) {
      this.serviceOrganizer.getOrganizerById(organizerId, role).subscribe((response) => {
        this.organizerAccount = response;
        this.loading = false;
      });
    } else {
      this.serviceOrganizer.getOrganizer().subscribe((response) => {
        this.organizerAccount = response;
        if (!this.organizerAccount.name || !this.organizerAccount.contactEmail || !this.organizerAccount.telephone
            || !this.organizerAccount.description) {
          // this.router.navigate(['employer/editInfo']);
        }
        this.loading = false;
        this.isOwner = true;
      });
    }
  });

    this.jobFairState$ = this.serviceOrganizer.jobfairsOrganizer$(false).pipe(
        map((response: Page<JobFair>) => {
              response.content.forEach(
                  (jobfair) => {
                    this.addJobFairForList(jobfair);
                  }
              );
              console.log("jobFairsAsList " + this.jobFairsAsList);
              return response;
            }
        ));

    this.paginationUseList.forEach((paginationUse) => {

      paginationUse.state = this.serviceUtilities.paginateDataWithParams$<paginationUse.class>(paginationUse.route, paginationUse.pageIndex, paginationUse.pageSize, paginationUse.params? paginationUse.params:'').pipe(
        map((response: Page<typeof paginationUse.class>) => {
            response.content.forEach(
              (jobfair: JobFair | ParticipationRequest) => {
                this.addJobFairForList(jobfair);
              }
            );
            console.log("jobFairsAsList " + this.jobFairsAsList);
            return response;
          }
        ));
    });

    this.jobFairState$.subscribe((response) => {
      this.length = response ? response.totalElements : 0;
      this.pageSize = response ? response.size : 0;
      this.pageIndex = response ? response.number : 0;
    });
  }


  handlePageEvent(e: PageEvent, status: boolean = false) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.gotToPage(status, e.pageIndex);
  }


  gotToPage(status: boolean = false, pageNumber: number = 0): void {

    this.jobFairState$ = this.serviceOrganizer.jobfairsOrganizer$(status, pageNumber, this.pageSize).pipe(
        map((response: Page<JobFair>) => {
          response.content.forEach(
              (jobfair) => {
                this.addJobFairForList(jobfair);
              }
          );
          return response;
        }
    ));


  }

  deleteJobOffer(id: number): void {
    // this.serviceOrganizer.deleteJobOffer(id).subscribe((response) => {
    //   this.gotToPage();
    // });
  }

  addJobFairForList(jobFair: JobFair | ParticipationRequest): void {
    const x = jobFair instanceof ParticipationRequest;
    if(x){
      let offerAsItemInsideList: ItemInsideList = {
        route: "/employer/job-offer/" + jobFair.id,
        image:  this.companyPhoto,
        name: jobFair.name,
        id: jobFair.id ? jobFair.id : 0,
        description: `${jobFair.displayDescription}`,
        useFavorite: false,
        isFavorite: false,
        useDelete: true
      }
      this.jobFairsAsList.push(offerAsItemInsideList);
    }

  }

  addJobOfferForList(offer: JobOffer): void {
    let offerAsItemInsideList: ItemInsideList = {
      route: "/employer/job-offer/" + offer.id,
      image:  this.companyPhoto,
      name: offer.offerName,
      id: offer.id ? offer.id : 0,
      description: `${offer.industries.join(', ')} \n ${offer.salaryFrom}-${offer.salaryTo}`,
      useFavorite: false,
      isFavorite: false,
      useDelete: true
    }
    // this.offersAsList.push(offerAsItemInsideList);
  }

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
  convertjobfairsToListType(){
    this.jobFairs.forEach(jobfair => {
      let offerAsList: ItemInsideList = {
        route: "/organizer/jobfair/" + jobfair.id,
        image: "../assets/calendar.png",
        name: jobfair.name,
        id: jobfair.id,
        description: `${jobfair.address}, ${jobfair.dateStart}-${jobfair.dateEnd} \n ${jobfair.organizerId} `,
        useFavorite: false,
        isFavorite: false,
      }
      this.jobFairsAsList.push(offerAsList);
    })
  }

  printId(id: string | number){
    console.log(id);
  }


}


