import {Component, OnInit} from '@angular/core';
import {
  JobOfferFilterDto,
  ForListBackend,
  ItemInsideList,
  JobFair,
  Page,
  PaginationUse,
  FiliterType,
} from "../../types";
import {Observable} from "rxjs";

import {ActivatedRoute, ParamMap} from "@angular/router";
import {JobfairService} from "../services/jobfair.service";
import {PaginationService} from "../../utilities/service/pagination.service";
import {VariablesService} from "../../utilities/service/variables.service";

@Component({
  selector: 'app-jobfair',
  templateUrl: './jobfair.component.html',
  styleUrls: ['./jobfair.component.scss']
})
export class JobfairComponent implements OnInit {

  pageSize: number = 5;
  length: number = 20;
  employersAsList: ItemInsideList[] = [];
  companyPhoto = '../../assets/company.png';
  filters: JobOfferFilterDto = {
    contractTypeNames: [
      "umowa o pracę"
    ]
  };

  loadingSite: boolean = true;
  currentTabId = "jobFairs";
  paginationUseList: PaginationUse<ForListBackend>[] = [];
  isOwner: boolean = false;
  routeForChange: string = "";

  getPaginationService() {
    return this.servicePagination;
  }

  constructor(public route: ActivatedRoute,
              private serviceJobFair: JobfairService,
              private servicePagination: PaginationService,
              private variablesService: VariablesService) {

  }

  ngOnInit(): void {
    this.variablesService.initVariables();
    this.route.paramMap.subscribe((params: ParamMap) => {
      const role = localStorage.getItem('role');
      const jobfairId = Number(params.get('jobfair-id'));
      if (jobfairId) {
        this.paginationUseList = [
          {
            id: "employers",
            active: true,
            pageSize: 5,
            pageIndex: 0,
            length: 20,
            state: new Observable<Page<ForListBackend>>(),
            route: "/job-fairs/" + jobfairId + "/employers",
            routeToElement: "/" + role + "/employer/",
            list: [],
            loading: true,
            ListButtonsOptions: {
              useGettingInside: true,
              useDelete: this.isOwner,
              useSaved: false,
              isSaved: false,
              useApprove: false
            },
            ifGet: true,
            filters: null
          },
          {
            id: "job-offers",
            active: false,
            pageSize: 5,
            pageIndex: 0,
            length: 20,
            state: new Observable<Page<ForListBackend>>(),
            route: "/job-fairs/" + jobfairId + "/job-offers/list-display",
            routeToElement: "/"+role+"/employer/job-offer/",
            list: [],
            loading: true,
            ListButtonsOptions: {
              useGettingInside: true,
              useDelete: false,
              useSaved: false,
              isSaved: false,
              useApprove: false
            },
            ifGet: false,
            filters: {}
          }
        ]
        this.routeForChange = "/employee/job-offers/list-display/job-fair/"+jobfairId+"/recommendation";

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

        });

        this.paginationUseList.forEach((paginationUse: PaginationUse<ForListBackend>) => {
          this.servicePagination.changePaginationState(paginationUse, paginationUse.ListButtonsOptions);
        });

      } else {
        this.loading = false;
      }
    });

    this.paginationUseList.forEach((paginationUse: PaginationUse<ForListBackend>) => {
      paginationUse.state.subscribe((response) => {
        paginationUse.length = response ? response.totalElements : 0;
        paginationUse.pageSize = response ? response.size : 0;
        paginationUse.pageIndex = response ? response.number : 0;
      });
    });
  }

  loading: boolean = true;

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

  recommendOffers(id: string): void {
    const elem = this.getPaginationService().getPaginationUseById(id, this.paginationUseList);
    if(elem){
      const temp = elem.route;
      this.servicePagination.setRouteToElement(this.routeForChange, elem);
      this.routeForChange = temp;

      this.servicePagination.gotToPage(this.paginationUseList);
      elem.state.subscribe((response) => {});
    }

  }

  addEmployerForList(employer: ForListBackend): void {
    const role = localStorage.getItem('role');
    let employerAsItemInsideList: ItemInsideList = {
      route: "/employer/" + employer.id + "/account",
      image: employer.photo ? employer.photo : this.companyPhoto,
      name: employer.name,
      id: employer.id ? employer.id : 0,
      displayDescription: `${employer.displayDescription}`,
      ListButtonsOptions: {
        useGettingInside: true,
        useApprove: false,
        useSaved: false,
        isSaved: false,
        useDelete: false
      }

    }
    this.employersAsList.push(employerAsItemInsideList);
  }

  convertDate(date: string): string {
    return date.substring(0, 10) + " " + date.substring(11);
  }

  protected readonly FiliterType = FiliterType;

}
