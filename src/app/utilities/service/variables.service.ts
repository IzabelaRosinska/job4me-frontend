import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {idNameListElement, Page} from "../../types";
import {ROUTES} from "../../../environments/environments";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VariablesService {

  localizations: string[] = []
  levels: string[] = []
  industries: string[] = []
  employmentForms: string[] = []
  contractTypes: string[] = []

  constructor(private http: HttpClient) {
  }

  initVariables() {
    this.getLocalizations().subscribe((response) => {
      this.localizations = response.content.map((element) => element.name);
    });
    this.getLevels().subscribe((response) => {
      this.levels = response.content.map((element) => element.name);
    });
    this.getIndustries().subscribe((response) => {
      this.industries = response.content.map((element) => element.name);
    });
    this.getEmploymentForms().subscribe((response) => {
      this.employmentForms = response.content.map((element) => element.name);
    });
    this.getContractTypes().subscribe((response) => {
      this.contractTypes = response.content.map((element) => element.name);
    });
  }

  getLocalizations(): Observable<Page<idNameListElement>> {
    const route = ROUTES.BACKEND_ROUTE + '/localizations';
    return this.http.get<Page<idNameListElement>>(route, {
      withCredentials: true,
    });
  }

  getLevels(): Observable<Page<idNameListElement>> {
    const route = ROUTES.BACKEND_ROUTE + '/levels';
    return this.http.get<Page<idNameListElement>>(route, {
      withCredentials: true,
    });
  }

  getIndustries(): Observable<Page<idNameListElement>> {
    const route = ROUTES.BACKEND_ROUTE + '/industries';
    return this.http.get<Page<idNameListElement>>(route, {
      withCredentials: true,
    });
  }

  getEmploymentForms(): Observable<Page<idNameListElement>> {
    const route = ROUTES.BACKEND_ROUTE + '/employment-forms';
    return this.http.get<Page<idNameListElement>>(route, {
      withCredentials: true,
    });
  }

  getContractTypes(): Observable<Page<idNameListElement>> {
    const route = ROUTES.BACKEND_ROUTE + '/contract-types';
    return this.http.get<Page<idNameListElement>>(route, {
      withCredentials: true,
    });
  }

}
