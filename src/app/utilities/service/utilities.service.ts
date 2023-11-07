import { Injectable } from '@angular/core';
import {EmployeeAccount, idNameListElement, Page} from "../../types";
import {Observable} from "rxjs";
import {ROUTES} from "../../../environments/environments";
import {map, shareReplay} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(private http: HttpClient) { }

  getFilterOptions(endpoint: string): Observable<Page<idNameListElement>> {
    const route = ROUTES.BACKEND_ROUTE + endpoint;
    return this.http.get<Page<idNameListElement>>(route, {
      withCredentials: true,
    });
  }
}
