import {Injectable, OnInit} from '@angular/core';
import {catchError, Observable, Subscription, throwError} from "rxjs";
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


  levelsWithId: idNameListElement[] = []
  industriesWithId: idNameListElement[] = []
  employmentFormNamesWithId: idNameListElement[] = []
  contractTypesWithId: idNameListElement[] = []

  private initialized: boolean = false;


  dictionaryIfObjectFilter: Record<FiliterType, boolean> = {
    cities: true,
    levelNames: true,
    industryNames: true,
    employmentFormNames: true,
    contractTypeNames: true,
    salaryFrom: true,
    salaryTo: true,
    offerName: true,
    jobFairName: false,
    employerCompanyName: false,
    address: false
  }

  dictionaryIfLoaded: Record<FiliterType, boolean> = {
    cities: false,
    levelNames: true,
    industryNames: true,
    employmentFormNames: true,
    contractTypeNames: true,
    salaryFrom: false,
    salaryTo: false,
    offerName: false,
    jobFairName: false,
    employerCompanyName: false,
    address: false
  }

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
    jobFairName: "Nazwa targów",
    employerCompanyName: "Nazwa firmy",
    address: "Adres"
  }

  sortOffersOptions: Record<string, number> = {
    "Nie sortuj" : 1,
    "Po wynagrodzeniu od najniższego" : 2,
    "Po wynagrodzeniu od najwyższego" : 3,
    "Po nazwie od A do Z" : 4,
    "Po nazwie od Z do A" : 5
  }

  sortJobFairsOptions: Record<string, number> = {
    "Nie sortuj" : 1,
    "Po dacie od najnowszej" : 2,
    "Po dacie od najstarszej" : 3
  }

  constructor(private http: HttpClient) {
    this.initVariables();
  }

  getSortingOffersOptionsStrings(): string[] {
    return Object.keys(this.sortOffersOptions);
  }

  getSortJobFairsOptionsStrings(): string[] {
    return Object.keys(this.sortJobFairsOptions);
  }

  getIdOfElementFromList(array: idNameListElement[], name: string): number | undefined {
    const elementByName = array.filter((element) => element.name == name)[0];
    if(elementByName == undefined) return undefined;
    return elementByName.id? elementByName.id : undefined;
  }

  async initVariables() {

    if(!this.initialized) {
      // this.getLocalizations().subscribe((response0) => {
      //   this.cities = response0.content.map((element) => element.name);

      this.getLevels().subscribe((response1) => {
        this.levelsWithId = response1.content;
        this.levels = response1.content.map((element) => element.name);

        this.getIndustries().subscribe((response2) => {
          this.industriesWithId = response2.content;
          this.industries = response2.content.map((element) => element.name);

          this.getEmploymentFormsNames().subscribe((response3) => {
            this.employmentFormNamesWithId = response3.content;
            this.employmentFormNames = response3.content.map((element) => element.name);

            this.getContractTypes().subscribe((response4) => {
              this.contractTypesWithId = response4.content;
              this.contractTypes = response4.content.map((element) => element.name);

              this.dictionaryOfLoadedData = {
                cities: [],
                levelNames: this.levels,
                industryNames: this.industries,
                employmentFormNames: this.employmentFormNames,
                contractTypeNames: this.contractTypes,
                salaryFrom: [],
                salaryTo: [],
                offerName: [],
                jobFairName: [],
                employerCompanyName: [],
                address: []
              }

              this.initialized = true;
            });
          });
        });
      });
      // });
    }
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

  postBasic(endpoint: string, name: string): Observable<any> {
    const elem: idNameListElement = {name: name};
    const route = ROUTES.BACKEND_ROUTE + '/' + endpoint;
    return this.http.post(route, elem, {
      withCredentials: true,
    });
  }

  deleteBasic(endpoint: string, id: string | number): Observable<any> {
    const route = ROUTES.BACKEND_ROUTE + '/' + endpoint + '/' + id;
    return this.http.delete(route, {
      withCredentials: true,
    });
  }

  updateBasic(name: string): Observable<any> | void {
    switch (name) {
      case "cities":
        this.updateIndustryNames();
        break;
      case "levels":
        this.updateLevelNames();
        break;
      case "industries":
        this.updateIndustryNames();
        break;
      case "employment-forms":
        this.updateEmploymentFormsNames();
        break;
      case "contract-types":
        this.updateContractTypeNames();
        break;
      default:
        return throwError("Wrong name of variable");
    }
  }

  updateIndustryNames(): void {
    this.getIndustries().subscribe((response) => {
        this.industriesWithId = response.content;
        this.industries = response.content.map((element) => element.name);
      }
    );
  }

  updateLevelNames(): void {
    this.getLevels().subscribe((response) => {
        this.levelsWithId = response.content;
        this.levels = response.content.map((element) => element.name);
      }
    );
  }

  updateContractTypeNames(): void {
    this.getIndustries().subscribe((response) => {
        this.contractTypesWithId = response.content;
        this.contractTypes = response.content.map((element) => element.name);
      }
    );
  }

  updateEmploymentFormsNames(): void {
    this.getIndustries().subscribe((response) => {
        this.employmentFormNamesWithId = response.content;
        this.employmentFormNames = response.content.map((element) => element.name);
      }
    );
  }

  ngOnInit(): void {

  }

}
