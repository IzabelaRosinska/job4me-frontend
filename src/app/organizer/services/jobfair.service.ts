import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {JobFair, JobOffer, OrganizerAccount, EmployerAccount, Page, ForListBackend, PaymentCheckout, ParticipationRequest} from "../../types";
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

  requestForParticipation(jobFairId: number): Observable<any> {
    const route = ROUTES.BACKEND_ROUTE + '/employer/job-fairs/' + jobFairId + '/employer-participation';
    return this.http.request('post',route, {
      withCredentials: true,
      responseType: 'text',
      observe: 'response',
    }).pipe(shareReplay(1));
  }

  requestForCancelParticipation(jobFairId: number): Observable<any> {
    const route = ROUTES.BACKEND_ROUTE + '/employer/employer-participation/' + jobFairId;
    return this.http.request('delete',route, {
      withCredentials: true,
      responseType: 'text',
      observe: 'response',
    }).pipe(shareReplay(1));
  }

  isEmployerParticipating(jobFairId: number): Observable<any> {
    const route = ROUTES.BACKEND_ROUTE + '/employer/job-fairs/' + jobFairId + '/employer-participation/status';
    return this.http.get<ParticipationRequest>(route, {
      withCredentials: true,
    }).pipe(shareReplay(1));
  }


  getJobFairByIdForList(id: number): Observable<ForListBackend> {
    const route = ROUTES.BACKEND_ROUTE + '/job-fairs/'+id+'/job-offers/list-display';
    return this.http.get<ForListBackend>(route, {
      withCredentials: true,
    });
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

  creatJobFairWithPayment(jobfair: JobFair): Observable<any> {
    const route = ROUTES.BACKEND_ROUTE + '/organizer/job-fairs/payment';
    return this.http.request('post', route, {
      body: jobfair,
      responseType: 'json',
      observe: 'response',
      headers: {"Content-Type": 'application/json'},
      withCredentials: true,
    });
  }

  recommendJobOffer(jobOfferId: number, jobFairId: number): Observable<any> {
    const route =  ROUTES.BACKEND_ROUTE +'employee/job-offers/list-display/job-fair/'+jobOfferId+'/recommendation';
    return this.http.request('put', route, {
      withCredentials: true,
      responseType: 'text',
      observe: 'response',
    }).pipe(shareReplay(1));
  }

  participationEmployers$ = (jobFairId: number, page: number = 0, size: number = 5): Observable<Page<ForListBackend>> =>
      this.http.get<Page<ForListBackend>>(`${ROUTES.BACKEND_ROUTE}/job-fairs/${jobFairId}/employers?&page=${page}&size=${size}`).pipe(shareReplay(1));

}
