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

  loadingSite: boolean = true;


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
    ["0", true],
    ["1", false],
    ["2", false]
  ]

  currentTabId = "jobFairs";

  paginationUseList: PaginationUse<any>[] = [
    {
      id: "jobFairs",
      active: true,
      pageSize: 5,
      pageIndex: 0,
      length: 20,
      state: new Observable<Page<JobFair>>(),
      route: "/organizer/jobfair/",
      list: [],
      loading: true
    } as PaginationUse<JobFair>,
    {
      id: "acceptedEmployers",
      active: false,
      pageSize: 5,
      pageIndex: 0,
      length: 20,
      params: "&status=true",
      state: new Observable<Page<ParticipationRequest>>(),
      route: "/organizer/employer-participation",
      list: [],
      loading: true
    } as PaginationUse<ParticipationRequest>,
    {
      id: "pendingEmployers",
      active: false,
      pageSize: 5,
      pageIndex: 0,
      length: 20,
      params: "&status=false",
      state: new Observable<Page<ParticipationRequest>>(),
      route: "/organizer/employer-participation",
      list: [],
      loading: true
    } as PaginationUse<ParticipationRequest>
  ];

  constructor(private serviceOrganizer: OrganizerService,
              private serviceUtilities: UtilitiesService,
              private route: ActivatedRoute) {
  }

  getPangiationUseById(id: string): PaginationUse<any>{
    const elem = this.paginationUseList.find(item => item.id === id);
    if(elem == undefined){
      return this.paginationUseList[0];
    }
    return elem;
  }

  getPangiationUseIndexById(id: string): number{
    const elem = this.paginationUseList.findIndex(item => item.id === id);
    if(elem == undefined){
      return -1;
    }
    return elem;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const role = localStorage.getItem('role');
      const organizerId = localStorage.getItem('organizerId');
      if (organizerId && role) {
        this.serviceOrganizer.getOrganizerById(organizerId, role).subscribe((response) => {
          this.organizerAccount = response;
          this.loadingSite = false;
        });
      } else {
        this.serviceOrganizer.getOrganizer().subscribe((response) => {
          this.organizerAccount = response;
          if (!this.organizerAccount.name || !this.organizerAccount.contactEmail || !this.organizerAccount.telephone
              || !this.organizerAccount.description) {
            // this.router.navigate(['employer/editInfo']);
          }
          this.loadingSite = false;
          this.isOwner = true;
        });
      }
    });

    // this.jobFairState$ = this.serviceOrganizer.jobfairsOrganizer$().pipe(
    //     map((response: Page<JobFair>) => {
    //           response.content.forEach(
    //               (jobfair) => {
    //                 this.addJobFairForList(jobfair);
    //               }
    //           );
    //           console.log("jobFairsAsList " + this.jobFairsAsList);
    //           return response;
    //         }
    //     ));

    this.paginationUseList.forEach((paginationUse: PaginationUse<any>) => {
      const isJobFair = paginationUse.id === "jobFairs";
      if(isJobFair){
        this.changePaginationState<JobFair>(paginationUse, isJobFair);
      }else{
        this.changePaginationState<ParticipationRequest>(paginationUse, isJobFair);
      }
    });


    // this.paginationUseList[0].state = this.serviceOrganizer.jobfairsOrganizer$().pipe(
    //   map((response: Page<JobFair>) => {
    //       response.content.forEach(
    //         (jobfair) => {
    //           this.addJobFairForList(jobfair);
    //         }
    //       );
    //       console.log("jobFairsAsList " + this.jobFairsAsList);
    //       return response;
    //     }
    //   ));
    //
    // this.paginationUseList[1].state = this.serviceUtilities.paginateDataWithParams$<ParticipationRequest>(this.paginationUseList[1].route, this.paginationUseList[1].pageIndex, this.paginationUseList[1].pageSize, this.paginationUseList[1].params? this.paginationUseList[1].params:'').pipe(
    //     map((response: Page<ParticipationRequest>) => {
    //             response.content.forEach(
    //                 (request: ParticipationRequest) => {
    //                     console.log(2)
    //                     this.addRequestForList(request, this.paginationUseList[1]);
    //                 }
    //             );
    //             console.log("jobFairsAsList " + this.jobFairsAsList);
    //             return response;
    //         }
    //     ));

    // this.paginationUseList.filter((pag, index) => index!=0).forEach((paginationUse: PaginationUse<ParticipationRequest>) => {
    //   console.log(1);
    //   paginationUse.state = this.serviceUtilities.paginateDataWithParams$<ParticipationRequest>(paginationUse.route, paginationUse.pageIndex, paginationUse.pageSize, paginationUse.params? paginationUse.params:'').pipe(
    //     map((response: Page<ParticipationRequest>) => {
    //         response.content.forEach(
    //           (request: ParticipationRequest) => {
    //             console.log(2)
    //               this.addRequestForList(request, paginationUse);
    //           }
    //         );
    //         console.log("jobFairsAsList " + this.jobFairsAsList);
    //         return response;
    //       }
    //     )) as typeof paginationUse.state;
    // });

    this.paginationUseList.forEach((paginationUse: PaginationUse<any>) => {
      paginationUse.state.subscribe((response) => {
        paginationUse.length = response ? response.totalElements : 0;
        paginationUse.pageSize = response ? response.size : 0;
        paginationUse.pageIndex = response ? response.number : 0;
      });
    });

  }

  changePaginationState<T>(paginationUse: PaginationUse<any>, isJobFair: boolean = false): void {
    paginationUse.list = [];
    paginationUse.loading = true;
    paginationUse.state = this.serviceUtilities.paginateDataWithParams$<T>(paginationUse.route, paginationUse.pageIndex, paginationUse.pageSize, paginationUse.params? paginationUse.params:'').pipe(
      map((response: Page<T>) => {
          response.content.forEach(
            (jobfair) => {
              console.log('inside change pagination')
              if(isJobFair){
                this.addJobFairForList(jobfair as JobFair);
              }else{
                this.addRequestForList(jobfair as ParticipationRequest, paginationUse);
              }
            }
          );
           paginationUse.loading = false;
           console.log(paginationUse.id + " " + paginationUse.loading)
          return response;
        }
      ));
  }

  addRequestForList(request: ParticipationRequest, paginationUse: PaginationUse<ParticipationRequest>): void {
    if(paginationUse.id === "acceptedEmployers"){
      let itemInsideList: ItemInsideList = {
        route: "/employer/job-offer/" + request.id,
        image:  this.companyPhoto,
        name: request.jobFairName +" - "+ request.employerCompanyName,
        id: request.id,
        description: `${request.jobFairName+"#"+request.jobFairId} \n ${request.employerCompanyName+"#"+request.employerId}`,
        useFavorite: false,
        isFavorite: false,
        useDelete: true,
        useGettingInside: false
      }
      this.paginationUseList.find(paginationUse => paginationUse.id === "acceptedEmployers")?.list?.push(itemInsideList);
    }
    else{
        let itemInsideList: ItemInsideList = {
            route: "/employer/job-offer/" + request.id,
            image:  this.companyPhoto,
            name: request.jobFairName +" - "+ request.employerCompanyName,
            id: request.id,
            description: `${request.jobFairName+"#"+request.jobFairId} \n ${request.employerCompanyName+"#"+request.employerId}`,
            useFavorite: false,
            isFavorite: false,
            useDelete: true,
            useGettingInside: false,
            useApprove: true
        }
        this.paginationUseList.find(paginationUse => paginationUse.id === "pendingEmployers")?.list?.push(itemInsideList);
    }
  }

    addJobFairForList(jobFair: JobFair): void {
        if(jobFair){
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



  handlePageEvent(e: PageEvent, tabId: string, status: boolean = false) {
    const paginationUse = this.getPangiationUseById(tabId);
    this.pageEvent = e;
    paginationUse.length = e.length;
    paginationUse.pageSize = e.pageSize;
    paginationUse.pageIndex = e.pageIndex;
    this.gotToPage(status, e.pageIndex, paginationUse.id);
    paginationUse.state.subscribe((response) => {
      paginationUse.length = response ? response.totalElements : 0;
    });
  }


  gotToPage<T>(status: boolean = false, pageNumber: number = 0, paginationUseId?: string): void {
    const isJobFair = (paginationUseId?paginationUseId == "jobFairs": this.currentTabId == "jobFairs");
    if(isJobFair){
      this.changePaginationState<JobFair>(this.getPangiationUseById(paginationUseId?paginationUseId:this.currentTabId), isJobFair);
    }else{
      this.changePaginationState<ParticipationRequest>(this.getPangiationUseById(paginationUseId?paginationUseId:this.currentTabId), isJobFair);
    }
  }


  changeTab(tab: string) {
    this.currentTabId = tab;
    this.paginationUseList.map((elem) => {
      if (elem.id === tab) {
        elem.active = true;
      }else{
        elem.active = false;
      }
    })
  }


  deleteRequest(id: number): void {
    this.serviceOrganizer.deleteEmployerParticipation(id).subscribe((response) => {
      this.updateCurrentTabIdPagination();
    });
  }


  acceptRequest(id: number): void {
    this.serviceOrganizer.acceptEmployerParticipation(id).subscribe((response) => {
      this.updateCurrentTabIdPagination();
    });

  }

  updateCurrentTabIdPagination(): void{
    const elem = this.getPangiationUseById(this.currentTabId);
    elem.length = elem.length-1;
    this.gotToPage();
    elem.state.subscribe((response) => {});
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


    protected readonly console = console;
}


