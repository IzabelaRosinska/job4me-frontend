import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {JobFair, JobOffer} from "../../types";
import {ROUTES} from "../../../environments/environments";

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

  getJobFairs(): Observable<JobFair> {
    const route = ROUTES.BACKEND_ROUTE + '/job-fairs';
    return this.http.get<JobFair>(route, {
      withCredentials: true,
    });
  }

}
