import {Injectable, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {FiliterType, idNameListElement, Page} from "../../types";
import {ROUTES} from "../../../environments/environments";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VariablesService implements OnInit {

  cities: string[] = []
  levels: string[] = []
  industries: string[] = []
  employmentFormNames: string[] = []
  contractTypes: string[] = []

  dictionaryIfLoaded!: Record<FiliterType, boolean>
  dictionaryOfLoadedData!: Record<FiliterType, string[]>

  filterTranslations: Record<FiliterType, string> = {
    cities: "Miasto",
    employmentFormNames: "Forma zatrudnienia",
    levelNames: "Poziom",
    industryNames: "Branża",
    salaryFrom: "Wynagrodzenie od",
    salaryTo: "Wynagrodzenie do",
    contractTypeNames: "Typ umowy",
    offerName: "Nazwa oferty",
  }

  constructor(private http: HttpClient) {
    this.initVariables();
  }

  initVariables() {
    this.getLocalizations().subscribe((response0) => {
      this.cities = response0.content.map((element) => element.name);

      this.getLevels().subscribe((response1) => {
        this.levels = response1.content.map((element) => element.name);

        this.getIndustries().subscribe((response2) => {
          this.industries = response2.content.map((element) => element.name);

          this.getEmploymentFormsNames().subscribe((response3) => {
            this.employmentFormNames = response3.content.map((element) => element.name);

            this.getContractTypes().subscribe((response4) => {
              this.contractTypes = response4.content.map((element) => element.name);

              this.dictionaryIfLoaded = {
                cities: true,
                levelNames: true,
                industryNames: true,
                employmentFormNames: true,
                contractTypeNames: true,
                salaryFrom: false,
                salaryTo: false,
                offerName: false,
              }

              this.dictionaryOfLoadedData = {
                cities: this.cities,
                levelNames: this.levels,
                industryNames: this.industries,
                employmentFormNames: this.employmentFormNames,
                contractTypeNames: this.contractTypes,
                salaryFrom: [],
                salaryTo: [],
                offerName: [],
              }
            });
          });
        });
      });
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

  getEmploymentFormsNames(): Observable<Page<idNameListElement>> {
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

  ngOnInit(): void {

  }

}
