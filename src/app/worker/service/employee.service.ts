import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {WorkerAccount} from "../../types";
import {shareReplay} from "rxjs/operators";
import { ROUTES} from "../../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  putEmployee(employee: WorkerAccount): Observable<any> {
    const route = ROUTES.BACKEND_ROUTE +'/employee/cv';

    return this.http.request('put', route, {
      body: employee,
      withCredentials: true,
      responseType: 'text',
      observe: 'response',
    }).pipe(shareReplay(1));
  }

  getEmployee(): Observable<WorkerAccount> {

      const route = ROUTES.BACKEND_ROUTE + '/employee/cv';
      return this.http.get<WorkerAccount>(route, {
        withCredentials: true,
      });
  }

}
