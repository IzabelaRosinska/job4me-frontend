import {Component, OnInit} from '@angular/core';
import {EmployerAccount, FiliterType, ForListBackend, ItemInsideList, JobOffer, Page, PaginationUse} from "../../types";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {EmployerService} from "../service/employer.service";
import {BehaviorSubject, catchError, Observable, of, startWith} from "rxjs";
import {map} from "rxjs/operators";
import {PageEvent} from "@angular/material/paginator";
import {PaginationService} from "../../utilities/service/pagination.service";
import {VariablesService} from "../../utilities/service/variables.service";
import {SavedService} from "../../utilities/service/saved.service";

@Component({
  selector: 'app-employer-account',
  templateUrl: './employer-account.component.html',
  styleUrls: ['./employer-account.component.scss']
})
export class EmployerAccountComponent implements OnInit {

  constructor(private serviceEmployer: EmployerService,
              private route: ActivatedRoute,
              private paginationService: PaginationService,
              private router: Router,
              private variablesService: VariablesService,
              private savedService: SavedService  ) {
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

  pageSize: number = 5;
  length: number = 20;

  paginationUseList: PaginationUse<ForListBackend>[] = []
  loadingAccount: boolean = true;
  isOwner: boolean = false;
  role = localStorage.getItem('role');


  initPaginationUseListForOwner(role: string, employerId: number): void {
    this.paginationUseList = [
      {
        id: "active-job-offers",
        active: true,
        pageSize: 5,
        pageIndex: 0,
        length: 20,
        state: new Observable<Page<ForListBackend>>(),
        route: this.isOwner? "/employer/job-offers/list-display":"/job-offers/list-display/employers/"+employerId,
        routeToElement: this.isOwner? "/employer/job-offer/" : "/"+role+"/employer/job-offer/",
        params: [['isActive', 'true']],
        list: [],
        loading: true,
        listButtonsOptions: {
          useGettingInside: true,
          useDelete: this.isOwner,
          useSaved: role == 'employee',
          isSaved: false,
          useApprove: false
        },
        ifGet: false,
        filters: {}
      },
      {
        id: "inactive-job-offers",
        active: false,
        pageSize: 5,
        pageIndex: 0,
        length: 20,
        state: new Observable<Page<ForListBackend>>(),
        route: this.isOwner? "/employer/job-offers/list-display":"/job-offers/list-display/employers/"+employerId,
        routeToElement: this.isOwner? "/employer/job-offer/" : "/"+role+"/employer/job-offer/",
        params: [['isActive', 'false']],
        list: [],
        loading: true,
        listButtonsOptions: {
          useGettingInside: true,
          useDelete: true,
          useSaved: false,
          isSaved: false,
          useApprove: false
        },
        ifGet: false,
        filters: {}
      },
      {
        id: "acceptedEmployers",
        active: false,
        pageSize: 5,
        pageIndex: 0,
        length: 20,
        params: [["status","true"]],
        state: new Observable<Page<ForListBackend>>(),
        route: "/employer/employer-participation",
        routeToElement: "/employer/employer-participation",
        list: [],
        loading: true,
        ifGet: true,
        listButtonsOptions: {
          useSaved: false,
          isSaved: false,
          useDelete: this.isOwner,
          useApprove: false,
          useGettingInside: false
        }
      } as PaginationUse<ForListBackend>,
      {
        id: "pendingEmployers",
        active: false,
        pageSize: 5,
        pageIndex: 0,
        length: 20,
        params: [["status","false"]],
        state: new Observable<Page<ForListBackend>>(),
        route: "/employer/employer-participation",
        routeToElement: "/employer/employer-participation",
        list: [],
        loading: true,
        ifGet: true,
        listButtonsOptions: {
          useSaved: false,
          isSaved: false,
          useDelete: this.isOwner,
          useApprove: false,
          useGettingInside: false
        }
      } as PaginationUse<ForListBackend>
    ]

    this.paginationService.initPagination(this.paginationUseList);
  }

  initPaginationUseListForVisitor(role: string, employerId: number): void {
    this.paginationUseList = [
      {
        id: "active-job-offers",
        active: true,
        pageSize: 5,
        pageIndex: 0,
        length: 20,
        state: new Observable<Page<ForListBackend>>(),
        route: role=='employee'? "/employee/job-offers/list-display/employers/"+employerId:"/job-offers/list-display/employers/"+employerId,
        routeToElement: this.isOwner? "/employer/job-offer/" : "/"+role+"/employer/job-offer/",
        params: [['isActive', 'true']],
        list: [],
        loading: true,
        listButtonsOptions: {
          useGettingInside: true,
          useDelete: this.isOwner,
          useSaved: role == 'employee',
          isSaved: false,
          useApprove: false
        },
        ifGet: false,
        filters: {}
      }
    ]

    this.paginationService.initPagination(this.paginationUseList);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const role = localStorage.getItem('role');
      const employerId = Number(params.get('employer-id'));
      if (employerId && role && role != 'employer') {

        this.serviceEmployer.getEmployerByIdAuthenticated(employerId, role).subscribe((response) => {
          this.employerAccount = response;
          this.initPaginationUseListForVisitor(role, employerId);
          this.loadingAccount = false;
        });
      } else {
        if(role=='employer' && !employerId){
          this.serviceEmployer.getEmployer().subscribe((response) => {
            this.employerAccount = response;
            if (!this.employerAccount.companyName || !this.employerAccount.email || !this.employerAccount.description || !this.employerAccount.displayDescription) {
              this.router.navigate(['/employer/edit-form']);
            }
            this.isOwner = true;
            this.initPaginationUseListForOwner(role?role:'', employerId);
            this.loadingAccount = false;
          });
        }else{
          this.serviceEmployer.getEmployerById(employerId).subscribe((response) => {
            this.employerAccount = response;
            this.initPaginationUseListForOwner(role?role:'', employerId);
            this.loadingAccount = false;
          });
        }

      }

    });
  }

  getSavedService(): SavedService {
    return this.savedService;
  }

  getPaginationService(){
    return this.paginationService;
  }

  getVariablesService(){
    return this.variablesService;
  }

  deleteJobOffer(id: number): void {
    this.serviceEmployer.deleteJobOffer(id).subscribe((response) => {
        this.getPaginationService().updateCurrentTabIdPagination(this.paginationUseList);
    });
  }

  deleteRequest(id: number): void {
    this.serviceEmployer.deleteEmployerParticipation(id).subscribe((response) => {
      this.getPaginationService().updateCurrentTabIdPagination(this.paginationUseList);
    });
  }





  protected readonly FiliterType = FiliterType;
}
