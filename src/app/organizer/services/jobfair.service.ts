import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {JobFair, JobOffer, OrganizerAccount, EmployerAccount, Page, ForListBackend} from "../../types";
import {ROUTES} from "../../../environments/environments";
import {shareReplay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class JobfairService {

  constructor(private http: HttpClient ) {}

  getJobFairById(id: number): Observable<JobFair> {
    const route = ROUTES.BACKEND_ROUTE + '/job-fairs/' + id;
    return this.http.get<JobFair>(route, {
      withCredentials: true,
    });
  }

  getJobFairByIdForList(id: number): Observable<ForListBackend> {
    const route = ROUTES.BACKEND_ROUTE + '/job-fairs/'+id+'/job-offers/list-display';
    return this.http.get<ForListBackend>(route, {
      withCredentials: true,
    });
  }

  getJobFairs(): Observable<JobFair> {
    const route = ROUTES.BACKEND_ROUTE + '/job-fairs';
    return this.http.get<JobFair>(route, {
      withCredentials: true,
    });
  }

  postJobFair(jobfair: JobFair): Observable<any> {
    const route =  ROUTES.BACKEND_ROUTE +'/organizer/job-fairs';
    return this.http.request('post', route, {
      body: jobfair,
      withCredentials: true,
      responseType: 'text',
      observe: 'response',
    }).pipe(shareReplay(1));
  }

  putJobFair(jobfair: JobFair): Observable<any> {
    const route =  ROUTES.BACKEND_ROUTE +'/organizer/job-fairs/' + jobfair.id;
    return this.http.request('put', route, {
      body: jobfair,
      withCredentials: true,
      responseType: 'text',
      observe: 'response',
    }).pipe(shareReplay(1));
  }

  participationEmployers$ = (jobFairId: number, page: number = 0, size: number = 5): Observable<Page<ForListBackend>> =>
      this.http.get<Page<ForListBackend>>(`${ROUTES.BACKEND_ROUTE}/job-fairs/${jobFairId}/employers?&page=${page}&size=${size}`).pipe(shareReplay(1));


}
