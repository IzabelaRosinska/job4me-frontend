import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {EmployeeAccount} from "../../types";
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

  // getPdf(): Observable<any> {
  //   const route = ROUTES.BACKEND_ROUTE + '/employee/cv/pdf';
  //   return this.http.get(route, {
  //     withCredentials: true,
  //   });
  // }

//   HttpHeaders header = new HttpHeaders();
//   header.add("Content-Type", "application/pdf");
//   System.out.println("htmlContent");
//   System.out.println(htmlContent);
//
//   System.out.println("bytes");
//   System.out.println(bytes);
//
//   return ResponseEntity.ok()
// .headers(header)
// .contentType(MediaType.APPLICATION_PDF)
// .body(bytes);
//  response from backend
  getPdf(): Observable<any> {
    const route = ROUTES.BACKEND_ROUTE + '/employee/cv/pdf';

    // Set headers to accept PDF response
    const headers = new HttpHeaders({
      'Content-Type': 'application/pdf',
      Accept: 'application/pdf',
    });

    return this.http.get(route, {
      headers: headers,
      observe: 'response',
      responseType: 'arraybuffer' as 'json',
      withCredentials: true,
    });
  }


}
