import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JobFair, JobOffer, OrganizerAccount, Page} from "../../types";
import {Observable} from "rxjs";
import {ROUTES} from "../../../environments/environments";
import {shareReplay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OrganizerService {
  constructor(private http: HttpClient) { }

  postOrganizer(organizer: OrganizerAccount): Observable<any> {
    const route =  ROUTES.BACKEND_ROUTE +'/organizer/account';
    return this.http.request('post', route, {
      body: organizer,
      withCredentials: true,
      responseType: 'text',
      observe: 'response',
    }).pipe(shareReplay(1));
  }

  getOrganizer(): Observable<OrganizerAccount> {
    const route = ROUTES.BACKEND_ROUTE + '/organizer/account';
    return this.http.get<OrganizerAccount>(route, {
      withCredentials: true,
    });
  }

  getOrganizerById(id: number | string, role: string): Observable<OrganizerAccount> {
    const route = ROUTES.BACKEND_ROUTE+'/'+role+'/organizer/'+id+'/account';
    return this.http.get<OrganizerAccount>(route, {
      withCredentials: true,
    });
  }

  jobfairsOrganizer$ = (status: boolean, page: number = 0, size: number = 5): Observable<Page<JobFair>> =>
      this.http.get<Page<JobFair>>(`${ROUTES.BACKEND_ROUTE}/organizer/employer-participation?&page=${page}&size=${size}&status=${status}`).pipe(shareReplay(1));

}
