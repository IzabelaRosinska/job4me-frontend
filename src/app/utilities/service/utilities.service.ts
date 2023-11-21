import { Injectable } from '@angular/core';
import {EmployeeAccount, idNameListElement, JobOffer, Page} from "../../types";
import {BehaviorSubject, catchError, Observable, of, startWith} from "rxjs";
import {ROUTES} from "../../../environments/environments";
import {map, shareReplay} from "rxjs/operators";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  // jobOffersState$!: Observable<{ appState: string, appData?: Page<T>, error?: HttpErrorResponse }>;
  // responseSubject = new BehaviorSubject<Page<T>>({} as Page<T>);
  // private currentPageSubject = new BehaviorSubject<number>(0);

  pageSize: number = 5;
  pageIndex: number = 0;
  length: number = 20;

  create<T>(route: string){
    this.paginateData$<T>(route,this.pageIndex,this.pageSize).subscribe((response) => {
      this.length = response ? response.totalElements : 0;
      this.pageSize = response ? response.size : 0;
      this.pageIndex = response ? response.number : 0;
    });
    return this.paginateData$<T>(route,this.pageIndex,this.pageSize);
  }

  gotToPage(route: string, pageNumber: number = 0): void {
    this.paginateData$(route, pageNumber, this.pageSize)
  }

  constructor(private http: HttpClient) { }

  getFilterOptions(endpoint: string): Observable<Page<idNameListElement>> {
    const route = ROUTES.BACKEND_ROUTE + endpoint;
    return this.http.get<Page<idNameListElement>>(route, {
      withCredentials: true,
    });
  }


  paginateData$ = <T>(route: string, page: number = 0, size: number = 5): Observable<Page<T>> =>
      this.http.get<Page<T>>(`${ROUTES.BACKEND_ROUTE}/${route}?&page=${page}&size=${size}`).pipe(shareReplay(1));

  paginateDataWithParams$ = <T>(route: string, page: number = 0, size: number = 5, params?: string): Observable<Page<T>> =>
    this.http.get<Page<T>>(`${ROUTES.BACKEND_ROUTE}/${route}?&page=${page}&size=${size}${params?params:''}`).pipe(shareReplay(1));

}
