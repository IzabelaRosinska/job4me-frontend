import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OrganizerAccount} from "../../types";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {shareReplay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OrganizerService {
  constructor(private http: HttpClient) { }

  postOrganizer(organizer: OrganizerAccount): Observable<any> {
    const route =  environment.BACKEND_ROUTE +'/organizer/account';
    return this.http.request('post', route, {
      body: organizer,
      withCredentials: true,
      responseType: 'text',
      observe: 'response',
    }).pipe(shareReplay(1));
  }

  getOrganizer(): Observable<OrganizerAccount> {
    const route = environment.BACKEND_ROUTE + '/organizer/account';
    return this.http.get<OrganizerAccount>(route, {
      withCredentials: true,
    });
  }
}
