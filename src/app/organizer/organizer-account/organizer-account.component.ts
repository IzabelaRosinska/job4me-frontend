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

    companyPhoto = '../../assets/company.png';
    length: number = 20;

    pageEvent?: PageEvent;

    filters: [string, string][] = [["Minimalne wynagrodzenie", ""], ["Branża", "/industries"], ["Poziomy", "/levels"]];

    currentTabId = "jobFairs";

    isOwner: boolean = false;

    paginationUseList: PaginationUse<any>[] = [
        {
            id: "jobFairs",
            active: true,
            pageSize: 5,
            pageIndex: 0,
            length: 20,
            state: new Observable<Page<JobFair>>(),
            route: "/organizer/job-fairs",
            routeToElement: "/organizer/job-fair/",
            listButtonsOptions: {
              useSaved: false,
              isSaved: false,
              useDelete: true,
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

    constructor(private serviceOrganizer: OrganizerService,
                private serviceUtilities: UtilitiesService,
                private route: ActivatedRoute,
                private router: Router,
                private servicePagination: PaginationService) {
    }

  getPaginationService() {
    return this.servicePagination;
  }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            const role = localStorage.getItem('role');
            const organizerId = localStorage.getItem('organizer-id');
            if (organizerId && role) {
                this.serviceOrganizer.getOrganizerById(organizerId, role).subscribe((response) => {
                    this.organizerAccount = response;
                    this.paginationUseList[0].route = "/job-fairs/organizer/" + this.organizerAccount.id;
                    this.getPaginationService().initPagination(this.paginationUseList);
                    this.loadingSite = false;
                });
            } else {
                this.serviceOrganizer.getOrganizer().subscribe((response) => {
                    this.organizerAccount = response;
                    if (!this.organizerAccount.name || !this.organizerAccount.contactEmail || !this.organizerAccount.telephone
                        || !this.organizerAccount.description) {
                        this.router.navigate(['organizer/edit-info']);
                    }
                    this.paginationUseList[0].route = "/organizer/job-fairs";
                    this.getPaginationService().initPagination(this.paginationUseList);
                    this.loadingSite = false;
                    this.isOwner = true;
                });
            }
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


