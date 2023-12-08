import {Component, OnInit} from '@angular/core';
import {
    FiliterType,
    ForListBackend,
    ItemInsideList,
    JobFair,
    OrganizerAccount,
    Page,
    PaginationUse,
    ParticipationRequest
} from "../../types";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {map} from "rxjs/operators";
import {OrganizerService} from "../services/organizer.service";
import {UtilitiesService} from "../../utilities/service/utilities.service";
import {Observable} from "rxjs";
import {PaginationService} from "../../utilities/service/pagination.service";
import {JobfairService} from "../services/jobfair.service";

@Component({
    selector: 'app-organizer-account',
    templateUrl: './organizer-account.component.html',
    styleUrls: ['./organizer-account.component.scss']
})
export class OrganizerAccountComponent implements OnInit {

    loadingSite: boolean = true;

    organizerAccount: OrganizerAccount = {
        id: 0,
        name: "",
        contactEmail: "",
        telephone: "",
        description: "",
    }

    length: number = 20;
    isOwner: boolean = false;

    paginationUseList: PaginationUse<any>[] = [];

    constructor(private serviceOrganizer: OrganizerService,
                private serviceJobfair: JobfairService,
                private serviceUtilities: UtilitiesService,
                private route: ActivatedRoute,
                private router: Router,
                private servicePagination: PaginationService) {
    }

  getPaginationService() {
    return this.servicePagination;
  }

  initPagiantionUseList(organizerId: string = ""){
      this.paginationUseList = [
        {
          id: "jobFairs",
          active: true,
          pageSize: 5,
          pageIndex: 0,
          length: 20,
          state: new Observable<Page<JobFair>>(),
          route: "/organizer/job-fairs",
          routeToElement: "/organizer/job-fair/",
          params: [["showUpcoming", "true"]],
          listButtonsOptions: {
            useSaved: false,
            isSaved: false,
            useDelete: false,
            useApprove: false,
            useGettingInside: true
          },
          list: [],
          loading: true,
          ifGet: true,

        } as PaginationUse<JobFair>,
        {
          id: "jobFairsPast",
          active: false,
          pageSize: 5,
          pageIndex: 0,
          length: 20,
          state: new Observable<Page<JobFair>>(),
          route: "/organizer/job-fairs",
          routeToElement: "/organizer/job-fair/",
          params: [["showUpcoming", "false"]],
          listButtonsOptions: {
            useSaved: false,
            isSaved: false,
            useDelete: false,
            useApprove: false,
            useGettingInside: true
          },
          list: [],
          loading: true,
          ifGet: true,
        } as PaginationUse<JobFair>,
        {
          id: "jobFairsUnpaid",
          active: false,
          pageSize: 5,
          pageIndex: 0,
          length: 20,
          state: new Observable<Page<JobFair>>(),
          route: "/organizer/job-fairs",
          routeToElement: "/organizer/job-fair/",
          params: [["isPaid", "false"]],
          listButtonsOptions: {
            useSaved: false,
            isSaved: false,
            useDelete: false,
            useApprove: false,
            useGettingInside: true
          },
          list: [],
          loading: true,
          ifGet: true,
        } as PaginationUse<JobFair>,
        {
          id: "acceptedEmployers",
          active: false,
          pageSize: 5,
          pageIndex: 0,
          length: 20,
          params: [["status","true"]],
          state: new Observable<Page<ParticipationRequest>>(),
          route: "/organizer/employer-participation",
          routeToElement: "/organizer/employer-participation",
          list: [],
          loading: true,
          ifGet: true,
          listButtonsOptions: {
            useSaved: false,
            isSaved: false,
            useDelete: true,
            useApprove: false,
            useGettingInside: false
          }
        } as PaginationUse<ParticipationRequest>,
        {
          id: "pendingEmployers",
          active: false,
          pageSize: 5,
          pageIndex: 0,
          length: 20,
          params: [["status","false"]],
          state: new Observable<Page<ParticipationRequest>>(),
          route: "/organizer/employer-participation",
          routeToElement: "/organizer/employer-participation",
          list: [],
          loading: true,
          ifGet: true,
          listButtonsOptions: {
            useSaved: false,
            isSaved: false,
            useDelete: true,
            useApprove: true,
            useGettingInside: false
          }
        } as PaginationUse<ParticipationRequest>
      ];

      if(!this.isOwner){
        this.paginationUseList[0].route = "/job-fairs/organizer/"+organizerId;
        this.paginationUseList[0].routeToElement = "/organizer/job-fair/";
        this.paginationUseList[1].route = "/job-fairs/organizer/"+organizerId;
        this.paginationUseList[1].routeToElement = "/organizer/job-fair/";
      }
  }

  ngOnInit(): void {
      this.route.paramMap.subscribe((params: ParamMap) => {
          const role = localStorage.getItem('role');
          const organizerId = params.get('organizer-id');

          if (organizerId && role) {
            console.log("role: ", role);
              this.serviceOrganizer.getOrganizerByIdAuthenticated(organizerId, role).subscribe((response) => {
                this.organizerAccount = response;
                this.loadingSite = false;
                this.initPagiantionUseList(organizerId);
                this.servicePagination.initPagination([this.paginationUseList[0], this.paginationUseList[1]]);
              });
          } else {
            if(role=="organizer" && !organizerId){
              this.serviceOrganizer.getOrganizer().subscribe((response) => {
                this.organizerAccount = response;
                if (!this.organizerAccount.name || !this.organizerAccount.contactEmail || !this.organizerAccount.telephone
                  || !this.organizerAccount.description) {
                  this.router.navigate(['organizer/edit-info']);
                }
                this.loadingSite = false;
                this.isOwner = true;
                this.initPagiantionUseList();
                this.servicePagination.initPagination(this.paginationUseList);
              });
            }else if(organizerId){
              this.serviceOrganizer.getOrganizerById(organizerId).subscribe((response) => {
                this.organizerAccount = response;
                this.loadingSite = false;
                this.initPagiantionUseList(organizerId);
                this.servicePagination.initPagination([this.paginationUseList[0], this.paginationUseList[1]]);
              });
            }

          }
      });

  }


  deleteJobFair(id: number): void {
      this.serviceJobfair.deleteJobFairById(id).subscribe((response) => {
        this.getPaginationService().updateCurrentTabIdPagination(this.paginationUseList);
      });
  }

  deleteRequest(id: number): void {
      this.serviceOrganizer.deleteEmployerParticipation(id).subscribe((response) => {
        this.getPaginationService().updateCurrentTabIdPagination(this.paginationUseList);
      });
  }

  acceptRequest(id: number): void {
      this.serviceOrganizer.acceptEmployerParticipation(id).subscribe((response) => {
          this.getPaginationService().updateCurrentTabIdPagination(this.paginationUseList);
      });
  }


  protected readonly console = console;
  protected readonly FiliterType = FiliterType;

}


