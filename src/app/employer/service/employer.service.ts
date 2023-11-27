import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ROUTES} from "../../../environments/environments";
import {map, shareReplay} from "rxjs/operators";
import {ApiResponse, EmployerAccount, JobOffer, Page, EmployeeAccount} from "../../types";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  constructor(private http: HttpClient) {
  }

  postEmployer(employer: EmployerAccount): Observable<any> {
    const route = ROUTES.BACKEND_ROUTE + '/employer/account';
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

  getEmployerById(id: number | string, role: string): Observable<EmployerAccount> {
    const route = ROUTES.BACKEND_ROUTE + '/' + role + '/employer/' + id + '/account';
    return this.http.get<EmployerAccount>(route, {
      withCredentials: true,
    });
  }


  postJobOffer(jobOffer: JobOffer): Observable<any> {
    const route = ROUTES.BACKEND_ROUTE + '/job-offers';
    return this.http.request('post', route, {
      body: jobOffer,
      withCredentials: true,
      responseType: 'text',
      observe: 'response',
    }).pipe(shareReplay(1));
  }

  putJobOffer(jobOffer: JobOffer): Observable<any> {
    console.log(jobOffer);
    const route = ROUTES.BACKEND_ROUTE + '/employer/job-offers/' + jobOffer.id;
    return this.http.request('put', route, {
      body: jobOffer,
      withCredentials: true,
      responseType: 'text',
      observe: 'response',
    }).pipe(shareReplay(1));
  }

  deleteJobOffer(id: number | string | null): Observable<any> {
    const route = ROUTES.BACKEND_ROUTE + '/employer/job-offers/' + (id ? id : 0);
    return this.http.request('delete', route, {
      withCredentials: true,
      responseType: 'text',
      observe: 'response',
    }).pipe(shareReplay(1));
  }

  getJobOffer(id: string | number | null): Observable<JobOffer> {
    const route = ROUTES.BACKEND_ROUTE + '/job-offers/' + (id ? id : 0);
    return this.http.get<JobOffer>(route, {
      withCredentials: true,
    });
  }

  activateJobOffer(id: string | number): Observable<any> {
    const route = ROUTES.BACKEND_ROUTE + '/employer/job-offers/' + id + '/activate';
    return this.http.request('put', route, {
      withCredentials: true,
      responseType: 'text',
      observe: 'response',
    }).pipe(shareReplay(1));
  }

  deactivateJobOffer(id: string | number): Observable<any> {
    const route = ROUTES.BACKEND_ROUTE + '/employer/job-offers/' + id + '/deactivate';
    return this.http.request('put', route, {
      withCredentials: true,
      responseType: 'text',
      observe: 'response',
    }).pipe(shareReplay(1));
  }

  getJobOffers(page: number = 0, size: number = 20): Observable<any> {
    const route = ROUTES.BACKEND_ROUTE + '/job-offers?' + 'page=' + page + '&size=' + size;
    return this.http.get<JobOffer[]>(route, {
      withCredentials: true
    });
  }

  getJobOffer$ = (id: number | string | null): Observable<JobOffer> =>
    this.http.request<JobOffer>('get', ROUTES.BACKEND_ROUTE + '/job-offers/' + (id ? id : 0), {
      withCredentials: true
    });

  jobOffers$ = (page: number = 0, size: number = 5): Observable<Page<JobOffer>> =>
    this.http.get<Page<JobOffer>>(`${ROUTES.BACKEND_ROUTE}/job-offers?&page=${page}&size=${size}`).pipe(shareReplay(1));

}
