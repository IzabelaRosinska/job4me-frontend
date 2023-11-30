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
import {EmployeeService} from "../../employee/service/employee.service";
import {VariablesService} from "../../utilities/service/variables.service";
import {SavedService} from "../../utilities/service/saved.service";

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

  role: string | null = localStorage.getItem('role');

  getPaginationService() {
    return this.servicePagination;
  }

  constructor(public route: ActivatedRoute,
              private serviceJobFair: JobfairService,
              private servicePagination: PaginationService,
              private variablesService: VariablesService,
              private serviceEmployee: EmployeeService,
              private savedService: SavedService) {
    const role = localStorage.getItem('role');

  }

  getSavedService(): SavedService {
    return this.savedService;
  }

  ngOnInit(): void {
    this.variablesService.initVariables();
    this.route.paramMap.subscribe((params: ParamMap) => {
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
            route: this.role=='employee'?"/employee/job-fairs/" + jobfairId + "/employers":"/job-fairs/" + jobfairId + "/employers",
            routeToElement: "/" + this.role + "/employer/",
            list: [],
            loading: true,
            listButtonsOptions: {
              useGettingInside: true,
              useDelete: this.isOwner,
              useSaved: this.role=='employee',
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
            route: this.role=='employee'?"/employee/job-offers/list-display/job-fair/"+jobfairId :
                                         "/job-fairs/" + jobfairId + "/job-offers/list-display",
            routeToElement: "/"+this.role+"/employer/job-offer/",
            list: [],
            loading: true,
            listButtonsOptions: {
              useGettingInside: true,
              useDelete: false,
              useSaved: this.role=='employee',
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

        this.servicePagination.initPagination(this.paginationUseList);

      } else {
        this.loading = false;
      }
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

  convertDate(date: string): string {
    return date.substring(0, 10) + " " + date.substring(11);
  }

  protected readonly FiliterType = FiliterType;

}
