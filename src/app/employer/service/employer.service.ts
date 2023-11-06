import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ROUTES} from "../../../environments/environments";
import {map, shareReplay} from "rxjs/operators";
import {EmployerAccount, JobOffer, WorkerAccount} from "../../types";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  constructor(private http: HttpClient) { }

  postEmployer(employer: EmployerAccount): Observable<any> {
    const route =  ROUTES.BACKEND_ROUTE +'/employer/account';
    return this.http.request('post', route, {
      body: employer,
      withCredentials: true,
      responseType: 'text',
      observe: 'response',
    }).pipe(shareReplay(1));
  }

  getEmployer(): Observable<EmployerAccount> {
    const route = ROUTES.BACKEND_ROUTE + '/employer/account';
    return this.http.get<EmployerAccount>(route, {
      withCredentials: true,
    });
  }


  postJobOffer(jobOffer: JobOffer): Observable<any> {
    const route =  ROUTES.BACKEND_ROUTE +'/job-offers';
    return this.http.request('post', route, {
      body: jobOffer,
      withCredentials: true,
      responseType: 'text',
      observe: 'response',
    }).pipe(shareReplay(1));
  }

  putJobOffer(jobOffer: JobOffer): Observable<any> {
    const route =  ROUTES.BACKEND_ROUTE +'/job-offers/+'+ jobOffer.id;
    return this.http.request('put', route, {
      body: jobOffer,
      withCredentials: true,
      responseType: 'text',
      observe: 'response',
    }).pipe(shareReplay(1));
  }

  getJobOffer(): Observable<JobOffer> {
    const route = ROUTES.BACKEND_ROUTE + '/job-offers/:id';
    return this.http.get<JobOffer>(route, {
      withCredentials: true,
    });
  }

  getJobOffers(page: number = 0, size: number = 20): Observable<any> {
    const route = ROUTES.BACKEND_ROUTE + '/job-offers?'+ 'page=' + page + '&size=' + size;
    return this.http.get<JobOffer[]>(route, {
      withCredentials: true
    });
  }

  getJobOffers$ = this.http.request<any>('get',ROUTES.BACKEND_ROUTE + '/job-offers', {
    withCredentials: true
  });



}
