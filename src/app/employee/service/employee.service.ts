import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {EmployeeAccount} from "../../types";
import {shareReplay} from "rxjs/operators";
import { environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  putEmployee(employee: EmployeeAccount): Observable<any> {
    const route = environment.BACKEND_ROUTE +'/employee/cv';

    return this.http.request('put', route, {
      body: employee,
      withCredentials: true,
      responseType: 'text',
      observe: 'response',
    }).pipe(shareReplay(1));
  }

  getEmployee(): Observable<EmployeeAccount> {

      const route = environment.BACKEND_ROUTE + '/employee/cv';
      return this.http.get<EmployeeAccount>(route, {
        withCredentials: true,
      });
  }

  getPdf(): Observable<any> {
    const route = ROUTES.BACKEND_ROUTE + '/employee/cv/pdf';

    const headers = new HttpHeaders({
      'Content-Type': 'application/pdf',
      Accept: 'application/pdf',
    });

    return this.http.get(route, {
      headers: headers,
      observe: 'response',
      responseType: 'blob',
      withCredentials: true,
    });
  }
}
