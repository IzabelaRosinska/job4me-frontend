import { Injectable } from '@angular/core';
import {ForListBackend, ItemInsideList, ListButtonsOptions, Page, PaginationUse} from "../../types";
import {map, shareReplay} from "rxjs/operators";
import {PageEvent} from "@angular/material/paginator";
import {Observable} from "rxjs";
import {ROUTES} from "../../../environments/environments";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor(private http: HttpClient) {}

  basePhoto = '../../assets/company.png';
  currentTabId: string = "";

  getPaginationUseById(id: string, paginationList: PaginationUse<ForListBackend>[]): PaginationUse<ForListBackend> | null {
    const elem = paginationList.find(item => item.id === id);
    if (elem == undefined) {
      return null;
    }
    return elem;
  }

  getDisplayListById(tabId: string, paginationUseList: PaginationUse<ForListBackend>[]): ItemInsideList[]{
    const paginationUse = this.getPaginationUseById(tabId, paginationUseList);
    if(paginationUse){
      return paginationUse.list;
    }
    return [];
  }

  isActiveById(id: string, paginationUseList: PaginationUse<ForListBackend>[]): boolean{
    const paginationUse = this.getPaginationUseById(id, paginationUseList);
    if(paginationUse){
      return paginationUse?.active;
    }
    return false;
  }


  changePaginationState(paginationUse: PaginationUse<ForListBackend>, listButtonsOptions: ListButtonsOptions | undefined): void {
    paginationUse.list = [];
    paginationUse.loading = true;
    paginationUse.state = this.paginateDataWithParams$(
        paginationUse.route, paginationUse.pageIndex, paginationUse.pageSize, paginationUse.params ? paginationUse.params : '').pipe(
        map((response: Page<ForListBackend>) => {
              response.content.forEach(
                  (elem) => {
                    paginationUse.list.push(this.addElementToDisplayList(elem, paginationUse.route, listButtonsOptions));
                  }
              );
              paginationUse.loading = false;
              console.log(paginationUse.id + " " + paginationUse.loading)
              return response;
            }
        ));
  }

  addElementToDisplayList(elem: ForListBackend, route: string, listButtonsOptions: ListButtonsOptions | undefined): ItemInsideList {

    let insideList: ItemInsideList = {
      route: route + elem.id,
      image: elem.photo ? elem.photo : this.basePhoto,
      name: elem.name,
      id: elem.id,
      displayDescription: elem.displayDescription,
      useSaved: listButtonsOptions? listButtonsOptions.useSaved : false,
      isSaved: listButtonsOptions? listButtonsOptions.isSaved : false,
      useDelete: listButtonsOptions? listButtonsOptions.useDelete : false,
      useApprove: listButtonsOptions? listButtonsOptions.useApprove : false,
      useGettingInside: listButtonsOptions? listButtonsOptions.useGettingInside : false
    }
    return insideList;
  }

  handlePageEvent(pe: PageEvent, tabId: string, paginationUseList: PaginationUse<ForListBackend>[]) {
    const paginationUse = this.getPaginationUseById(tabId, paginationUseList);
    if(paginationUse){
      paginationUse.length = pe.length;
      paginationUse.pageSize = pe.pageSize;
      paginationUse.pageIndex = pe.pageIndex;
      this.gotToPage(paginationUseList,paginationUse.id);
      paginationUse.state.subscribe((response) => {
        paginationUse.length = response ? response.totalElements : 0;
      });
    }

  }

  gotToPage(paginationUseList: PaginationUse<ForListBackend>[], paginationUseId?: string): void {
    const elem = this.getPaginationUseById(paginationUseId ? paginationUseId : this.currentTabId, paginationUseList);
    if (elem) {
      this.changePaginationState(elem, elem.ListButtonsOptions);
    }
  }

  changeTab(tabId: string, paginationUseList: PaginationUse<ForListBackend>[]) {
    this.currentTabId = tabId;
    paginationUseList.map((elem) => {
      if (elem.id === tabId) {
        elem.active = true;
      } else {
        elem.active = false;
      }
    })
  }

  // deleteRequest(id: number): void {
  //   this.serviceOrganizer.deleteEmployerParticipation(id).subscribe((response) => {
  //     this.updateCurrentTabIdPagination();
  //   });
  // }
  //
  // acceptRequest(id: number): void {
  //   this.serviceOrganizer.acceptEmployerParticipation(id).subscribe((response) => {
  //     this.updateCurrentTabIdPagination();
  //   });
  // }

  updateCurrentTabIdPagination(paginationUseList: PaginationUse<ForListBackend>[]): void {
      const elem = this.getPaginationUseById(this.currentTabId,paginationUseList);
        if(elem){
          elem.length = elem.length - 1;
          this.gotToPage(paginationUseList);
          elem.state.subscribe((response) => {});
        }
      }

  paginateDataWithParams$ = (route: string, page: number = 0, size: number = 5, params?: string): Observable<Page<ForListBackend>> =>
      this.http.get<Page<ForListBackend>>(`${ROUTES.BACKEND_ROUTE}${route}?&page=${page}&size=${size}&order=1${params?params:''}`).pipe(shareReplay(1));


}
