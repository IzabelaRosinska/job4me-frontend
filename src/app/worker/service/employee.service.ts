import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  // getEmployee(id: number): Observable<Employee> {
  //   return this.http.get<Employee>(`/api/employee/${id}`);
  // }


}
