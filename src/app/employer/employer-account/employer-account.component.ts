import {Component, OnInit} from '@angular/core';
import {EmployerAccount, FiliterType, ForListBackend, ItemInsideList, JobOffer, Page, PaginationUse} from "../../types";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {EmployerService} from "../service/employer.service";
import {BehaviorSubject, catchError, Observable, of, startWith} from "rxjs";
import {map} from "rxjs/operators";
import {PageEvent} from "@angular/material/paginator";
import {PaginationService} from "../../utilities/service/pagination.service";

@Component({
  selector: 'app-employer-account',
  templateUrl: './employer-account.component.html',
  styleUrls: ['./employer-account.component.scss']
})
export class EmployerAccountComponent implements OnInit {

  constructor(private serviceEmployer: EmployerService,
              private route: ActivatedRoute,
              private paginationService: PaginationService,
              private router: Router) {
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


  initPaginationUseList(role: string, employerId: number): void {
    this.paginationUseList = [
      {
        id: "active-job-offers",
        active: true,
        pageSize: 5,
        pageIndex: 0,
        length: 20,
        state: new Observable<Page<ForListBackend>>(),
        route: this.isOwner? "/employer/job-offers/list-display":"/job-offers/list-display/employer/"+employerId,
        routeToElement: this.isOwner? "/employer/job-offer/" : "/"+role+"/employer/job-offer/",
        params: [['isActive', 'true']],
        list: [],
        loading: true,
        listButtonsOptions: {
          useGettingInside: true,
          useDelete: this.isOwner,
          useSaved: false,
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
        route: this.isOwner? "/employer/job-offers/list-display":"/job-offers/list-display/employer/"+employerId,
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
      }
    ]
    console.log("EmployerId: "+employerId);
    this.paginationUseList.forEach((paginationUse: PaginationUse<ForListBackend>) => {
      this.paginationService.changePaginationState(paginationUse, paginationUse.listButtonsOptions);
    });
    this.paginationUseList.forEach((paginationUse: PaginationUse<ForListBackend>) => {
      paginationUse.state.subscribe((response) => {
        paginationUse.length = response ? response.totalElements : 0;
        paginationUse.pageSize = response ? response.size : 0;
        paginationUse.pageIndex = response ? response.number : 0;
      });
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const role = localStorage.getItem('role');
      const employerId = Number(params.get('employer-id'));
      if (employerId && role) {

        this.serviceEmployer.getEmployerById(employerId, role).subscribe((response) => {
          this.employerAccount = response;
          this.initPaginationUseList(role, employerId);
          this.loadingAccount = false;
        });
      } else {
        this.serviceEmployer.getEmployer().subscribe((response) => {
          this.employerAccount = response;
          if (!this.employerAccount.companyName || !this.employerAccount.email || !this.employerAccount.telephone
            || !this.employerAccount.description || !this.employerAccount.displayDescription) {
            this.router.navigate(['employer/edit-form']);
          }
          this.isOwner = true;
          this.initPaginationUseList(role?role:'', employerId);
          this.loadingAccount = false;
        });
      }

    });
  }

  getPaginationService(){
    return this.paginationService;
  }

  deleteJobOffer(id: number): void {
    this.serviceEmployer.deleteJobOffer(id).subscribe((response) => {
        this.getPaginationService().updateCurrentTabIdPagination(this.paginationUseList);
    });
  }


  protected readonly FiliterType = FiliterType;
}
