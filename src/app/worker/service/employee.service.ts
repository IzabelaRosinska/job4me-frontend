import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {WorkerAccount} from "../../types";
import {shareReplay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  // getEmployee(id: number): Observable<Employee> {
  //   return this.http.get<Employee>(`/api/employee/${id}`);
  // }

  putEmployee(employee: WorkerAccount): Observable<any> {
    const route = '/api/employee';
    return this.http.request('put', route, {
      body: employee,
      withCredentials: true,
      responseType: 'text',
      observe: 'response',
    }).pipe(shareReplay(1));

  }



}
