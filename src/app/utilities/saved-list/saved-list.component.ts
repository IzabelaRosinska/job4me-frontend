import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {JobfairService} from "../../organizer/services/jobfair.service";
import {PaginationService} from "../service/pagination.service";
import {ForListBackend, PaginationUse, FiliterType, Page} from "../../types";
import {Observable} from "rxjs";
import {SavedService} from "../service/saved.service";

@Component({
  selector: 'app-saved-list',
  templateUrl: './saved-list.component.html',
  styleUrls: ['./saved-list.component.scss']
})
export class SavedListComponent implements OnInit{


  @Input({ required: true }) routeMainPart: string = "";
  @Input({ required: true }) routeToElement: string = "";
  constructor(public route: ActivatedRoute,
              private servicePagination: PaginationService,
              private serviceSaved: SavedService) {
    console.log( "main: " + this.routeMainPart);
    console.log( "to: " + this.routeToElement);
  }

  protected readonly FiliterType = FiliterType;
  paginationUseList: PaginationUse<ForListBackend>[] = [];
  role: string | null = localStorage.getItem('role');


  getPaginationService() {
    return this.servicePagination;
  }

  getSavedService() {
    return this.serviceSaved;
  }
  ngOnInit(): void {
    this.routeMainPart = this.route.snapshot.data['routeMainPart'];
    this.routeToElement = this.route.snapshot.data['routeToElement'];
    const role = localStorage.getItem('role');
    this.paginationUseList = [
      {
        id: "saved",
        active: true,
        pageSize: 5,
        pageIndex: 0,
        length: 20,
        state: new Observable<Page<ForListBackend>>(),
        route: "/" + role + "/" +this.routeMainPart,
        routeToElement: this.routeToElement,
        list: [],
        loading: true,
        listButtonsOptions: {
          useGettingInside: true,
          useDelete: true,
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
