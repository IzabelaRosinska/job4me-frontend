import { Injectable } from '@angular/core';
import {ItemInsideList} from "../../types";
import {EmployeeService} from "../../employee/service/employee.service";
import {Observable} from "rxjs";
import {ROUTES} from "../../../environments/environments";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SavedService {

  constructor(private serviceEmployee: EmployeeService,
              private serviceEmployer: EmployeeService,
              private http: HttpClient) { }

  saveJobOffer(jobOffer: ItemInsideList): void {
    if(jobOffer.ListButtonsOptions.isSaved){
      this.serviceEmployee.saveJobOffer(jobOffer.id).subscribe((response) => {});
    }else{
      this.serviceEmployee.unsaveJobOffer(jobOffer.id).subscribe((response) => {});
    }
  }

  saveEmployer(jobOffer: ItemInsideList): void {
    if(jobOffer.ListButtonsOptions.isSaved){
      this.serviceEmployee.saveEmployer(jobOffer.id).subscribe((response) => {});
    }else{
      this.serviceEmployee.unsaveEmployer(jobOffer.id).subscribe((response) => {});
    }
  }

  toggleElement(role: string, routeMainPart: string, elem: ItemInsideList): void {
    if(elem.ListButtonsOptions.isSaved){
      this.saveElement(role,routeMainPart,elem.id).subscribe((response) => {});
    }else{
      this.unsaveElement(role,routeMainPart,elem.id).subscribe((response) => {});
    }
  }

  saveElement(role: string, routeMainPart: string, employerId: number): Observable<any> {
    const route = ROUTES.BACKEND_ROUTE + '/' + role + '/' + routeMainPart + '/' + employerId ;
    return this.http.post(route, null, {
      withCredentials: true,
    });
  }

  unsaveElement(role: string, routeMainPart: string, employerId: number): Observable<any> {
    const route = ROUTES.BACKEND_ROUTE + '/' + role + '/' + routeMainPart + '/' + employerId ;
    return this.http.delete(route, {
      withCredentials: true,
    });
  }

}
