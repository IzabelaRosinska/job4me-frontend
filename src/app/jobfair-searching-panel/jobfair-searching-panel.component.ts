import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {JobfairService} from "../organizer/services/jobfair.service";
import {PaginationService} from "../utilities/service/pagination.service";
import {FiliterType, ForListBackend, Page, PaginationUse} from "../types";
import {Observable} from "rxjs";

@Component({
  selector: 'app-jobfair-searching-panel',
  templateUrl: './jobfair-searching-panel.component.html',
  styleUrls: ['./jobfair-searching-panel.component.scss']
})
export class JobfairSearchingPanelComponent implements  OnInit{

  constructor(public route: ActivatedRoute,
              private serviceJobFair: JobfairService,
              private servicePagination: PaginationService) {
  }
  protected readonly FiliterType = FiliterType;
  paginationUseList: PaginationUse<ForListBackend>[] = [];

  getPaginationService() {
    return this.servicePagination;
  }

  ngOnInit(): void {
    this.paginationUseList = [
      {
        id: "job-fairs",
        active: true,
        pageSize: 5,
        pageIndex: 0,
        length: 20,
        state: new Observable<Page<ForListBackend>>(),
        route: "/job-fairs",
        routeToElement: "/organizer/job-fair/",
        list: [],
        loading: true,
        ListButtonsOptions: {
          useGettingInside: true,
          useDelete: false,
          useSaved: false,
          isSaved: false,
          useApprove: false
        },
        ifGet: true,
        filters: null
      }];

    this.servicePagination.initPagination(this.paginationUseList);
  }




}
