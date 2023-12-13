import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {EmployeeAccount, PdfDto, QrDto} from "../../types";
import {shareReplay} from "rxjs/operators";
import {ROUTES} from "../../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {
  }

  putEmployee(employee: EmployeeAccount): Observable<any> {
    const route = ROUTES.BACKEND_ROUTE + '/employee/cv';

    return this.http.request('put', route, {
      body: employee,
      withCredentials: true,
      responseType: 'text',
      observe: 'response',
    }).pipe(shareReplay(1));
  }

  getEmployee(): Observable<EmployeeAccount> {

    const route = ROUTES.BACKEND_ROUTE + '/employee/cv';
    return this.http.get<EmployeeAccount>(route, {
      withCredentials: true,
    });
  }

  getEmployeeById(id: number | string | null, role: string): Observable<EmployeeAccount> {
    const route = ROUTES.BACKEND_ROUTE + '/' + role + '/employee/' + (id ? id : 0) + '/account/';
    return this.http.get<EmployeeAccount>(route, {
      withCredentials: true,
    });
  }



  getPdf(): Observable<any> {
    const route = ROUTES.BACKEND_ROUTE + '/employee/cv/pdf';

    return this.http.get<PdfDto>(route, {
      observe: 'response',
      withCredentials: true,
    });
  }

  getQRCode(): Observable<any> {
    const route = ROUTES.BACKEND_ROUTE + '/employee/code';

    return this.http.get<QrDto>(route, {
      observe: 'response',
      withCredentials: true,
    });
  }

  saveJobOffer(offerId: number): Observable<any> {
    const route = ROUTES.BACKEND_ROUTE + '/employee/job-offers/' + offerId ;
    return this.http.post(route, null, {
      withCredentials: true,
    });
  }

  unsaveJobOffer(offerId: number): Observable<any> {
    const route = ROUTES.BACKEND_ROUTE + '/employee/job-offer/' + offerId ;
    return this.http.delete(route, {
      withCredentials: true,
    });
  }

  saveEmployer(employerId: number): Observable<any> {
    const route = ROUTES.BACKEND_ROUTE + '/employee/employers/' + employerId ;
    return this.http.post(route, null, {
      withCredentials: true,
    });
  }

  unsaveEmployer(employerId: number): Observable<any> {
    const route = ROUTES.BACKEND_ROUTE + '/employee/employers/' + employerId ;
    return this.http.delete(route, {
      withCredentials: true,
    });
  }



}
