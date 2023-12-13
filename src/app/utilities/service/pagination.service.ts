import {Injectable} from '@angular/core';
import {
  JobOfferFilterDto,
  ForListBackend,
  ItemInsideList,
  ListButtonsOptions,
  Page,
  PaginationUse,
  FiliterType
} from "../../types";
import {map, shareReplay} from "rxjs/operators";
import {PageEvent} from "@angular/material/paginator";
import {Observable} from "rxjs";
import {ROUTES} from "../../../environments/environments";
import {HttpClient} from "@angular/common/http";
import {VariablesService} from "./variables.service";

@Injectable({
    providedIn: 'root'
})
export class PaginationService {

    constructor(private http: HttpClient,
                private variablesService: VariablesService) {
    }

    basePhoto = '../../assets/company.png';
    currentTabId: string = "";

    initPagination(paginationUseList: PaginationUse<ForListBackend>[]){
      paginationUseList.forEach((paginationUse: PaginationUse<ForListBackend>) => {
        this.changePaginationState(paginationUse, paginationUse.listButtonsOptions);
      });

      paginationUseList.forEach((paginationUse: PaginationUse<ForListBackend>) => {
        paginationUse.state.subscribe((response) => {
          paginationUse.length = response ? response.totalElements : 0;
          paginationUse.pageSize = response ? response.size : 0;
          paginationUse.pageIndex = response ? response.number : 0;
        });
      });
    }

    getPaginationUseById(id: string, paginationList: PaginationUse<ForListBackend>[]): PaginationUse<ForListBackend> | null {
        const elem = paginationList.find(item => item.id === id);
        if (elem == undefined) {
            return null;
        }
        return elem;
    }

    getDisplayListById(tabId: string, paginationUseList: PaginationUse<ForListBackend>[]): ItemInsideList[] {
        const paginationUse = this.getPaginationUseById(tabId, paginationUseList);

        if (paginationUse) {
          if(paginationUse.listButtonsOptions?.useSaved ? paginationUse.listButtonsOptions?.isSaved: false){
            paginationUse.list.forEach((elem) => {
              elem.ListButtonsOptions.isSaved = true;
            });
          }
          return paginationUse.list;
        }
        return [];
    }

    isActiveById(id: string, paginationUseList: PaginationUse<ForListBackend>[]): boolean {
        const paginationUse = this.getPaginationUseById(id, paginationUseList);
        if (paginationUse) {
            return paginationUse?.active;
        }
        return false;
    }

    convertParamsToString(params: [string, string][] | undefined): string {
      if(params){
          let paramsString = '';
          params.forEach((elem) => {
              paramsString += '&' + elem[0] + '=' + elem[1];
          })
          return paramsString;
      }else{
          return '';
      }
    }

    changePaginationState(paginationUse: PaginationUse<ForListBackend>, listButtonsOptions: ListButtonsOptions | undefined): void {
        paginationUse.list = [];
        paginationUse.loading = true;
        paginationUse.state = this.paginateDataWithParams$(
            paginationUse.route, paginationUse.filters,paginationUse.ifGet, paginationUse.pageIndex, paginationUse.pageSize, this.convertParamsToString(paginationUse.params)).pipe(
            map((response: Page<ForListBackend>) => {
                    if(response){
                      if(response.content){
                        response.content.forEach(
                          (elem) => {
                            const insideList = this.addElementToDisplayList(elem, paginationUse.routeToElement, listButtonsOptions);
                            paginationUse.list.push(insideList);
                          }
                        );
                      }
                      paginationUse.loading = false;
                    }else{
                      paginationUse.loading = false;
                    }

                    return response;
                }
            ));
    }



    getParamIndexByName(name: string, paginationUse: PaginationUse<ForListBackend>): number | undefined {
      const param = paginationUse.params?.find((elem) => elem[0] === name);
      if (param) {
        return paginationUse.params?.indexOf(param);
      }
      return undefined;
    }

    addParam(paginationUse: PaginationUse<ForListBackend>, param: [string, string | undefined]): void {
      if(param[1]){
          if(paginationUse.params){
              const paramIndex = this.getParamIndexByName(param[0], paginationUse);

              console.log(paramIndex+ " "+ param[0] + " " + param[1]);

              if(paramIndex != undefined){
                  if(param[1] == ""){
                      paginationUse.params.splice(paramIndex, 1);
                  }else{
                      paginationUse.params[paramIndex][1] = param[1];
                  }
              }else{
                  paginationUse.params?.push([param[0], param[1]]);
              }
          }else{
              paginationUse.params = [[param[0], param[1]]];
          }
      }else{
          console.log(paginationUse.params);
          if(paginationUse.params){
              const paramIndex = this.getParamIndexByName(param[0], paginationUse);
              console.log(paramIndex);
              console.log(paramIndex!=undefined);

              if(paramIndex!=undefined){
                  console.log(3);
                  paginationUse.params.splice(paramIndex, 1);
              }
          }
      }
    }

    updateSorting(id: string, paginationUseList: PaginationUse<ForListBackend>[], sorting: number): void {
      const paginationUse = this.getPaginationUseById(id, paginationUseList);
      if (paginationUse) {

        this.addParam(paginationUse, ["order", sorting.toString()]);
        this.gotToPage(paginationUseList, id);
        paginationUse.state.subscribe((response) => {
          paginationUse.length = response ? response.totalElements : 0;});
      }
    }

    updateFilters(id: string, paginationUseList: PaginationUse<ForListBackend>[], filters: [FiliterType,string[]][]): void {

        const paginationUse = this.getPaginationUseById(id, paginationUseList);
        if (paginationUse) {
          var filterIsObject = false;
          filters.forEach((elem) => {
            console.log(elem[0] + " " + elem[1][0]);
            if(!this.variablesService.dictionaryIfObjectFilter[elem[0]]){
                this.addParam(paginationUse, [elem[0], elem[1][0]]);
            }else{
                filterIsObject = true;
            }
          });
          if(filterIsObject){
              paginationUse.filters = this.convertFiltersToFiltersDto(filters);
          }
          this.gotToPage(paginationUseList, id);
          paginationUse.state.subscribe((response) => {
              paginationUse.length = response ? response.totalElements : 0;
          });

        }
    }

    convertFiltersToFiltersDto(filters: [FiliterType,string[]][]): JobOfferFilterDto {
      const jobOfferFilterDto: JobOfferFilterDto = {
        cities: [this.getFilter(filters, FiliterType.cities)] as string[],
        employmentFormNames: this.getFilter(filters, FiliterType.employmentFormNames) as string[],
        levelNames: this.getFilter(filters, FiliterType.levelNames) as string[],
        contractTypeNames: this.getFilter(filters, FiliterType.contractTypeNames) as string[],
        salaryFrom: this.getFilter(filters, FiliterType.salaryFrom) != undefined?Number(this.getFilter(filters, FiliterType.salaryFrom) as string):undefined,
        salaryTo: this.getFilter(filters, FiliterType.salaryTo) != undefined?Number(this.getFilter(filters, FiliterType.salaryTo) as string):undefined,
        industryNames: this.getFilter(filters, FiliterType.industryNames) as string[],
        offerName: this.getFilter(filters, FiliterType.offerName) as string
      }
      return jobOfferFilterDto
    }

    convertFiltersDtoToFilters(filters: JobOfferFilterDto): [FiliterType,string[]][] {
      const filter: [FiliterType,string[]][] = [
        [FiliterType.cities, filters.cities?filters.cities:[]],
        [FiliterType.employmentFormNames, filters.employmentFormNames?filters.employmentFormNames:[]],
        [FiliterType.levelNames, filters.levelNames?filters.levelNames:[]],
        [FiliterType.contractTypeNames, filters.contractTypeNames?filters.contractTypeNames:[]],
        [FiliterType.salaryFrom, filters.salaryFrom?[filters.salaryFrom.toString()]:[]],
        [FiliterType.salaryTo, filters.salaryTo?[filters.salaryTo.toString()]:[]],
        [FiliterType.industryNames, filters.industryNames?filters.industryNames:[]],
        [FiliterType.offerName, filters.offerName?[filters.offerName]:[]]
      ]
      return filter
    }

    getFilter(filters: [FiliterType,string[]][], filterType: FiliterType): string[] | string | undefined {
      const filter = filters.find((elem) => elem[0] === filterType);
      if (filter && filter[1].length > 0) {
        if(this.variablesService.dictionaryIfLoaded[filterType]){
          return filter[1];
        }else{
          return filter[1][0];
        }
      }
      return undefined;
    }

    getLengthById(id: string, paginationUseList: PaginationUse<ForListBackend>[]){
      const paginationUse = this.getPaginationUseById(id, paginationUseList);
      return paginationUse?paginationUse.length:0;
    }

    getPageSizeById(id: string, paginationUseList: PaginationUse<ForListBackend>[]){
      const paginationUse = this.getPaginationUseById(id, paginationUseList);
      return paginationUse?paginationUse.pageSize:0;
    }


    addElementToDisplayList(elem: ForListBackend, route: string, listButtonsOptions: ListButtonsOptions | undefined): ItemInsideList {

        let insideList: ItemInsideList = {
            route: route + elem.id,
            image: elem.photo ? elem.photo : this.basePhoto,
            name: elem.name,
            id: elem.id,
            displayDescription: elem.displayDescription,
            ListButtonsOptions: {
                useSaved: listButtonsOptions ? listButtonsOptions.useSaved : false,
                isSaved: elem.isSaved ? elem.isSaved : false,
                useDelete: listButtonsOptions ? listButtonsOptions.useDelete : false,
                useApprove: listButtonsOptions ? listButtonsOptions.useApprove : false,
                useGettingInside: listButtonsOptions ? listButtonsOptions.useGettingInside : false
            }
        }
        return insideList;
    }

    handlePageEvent(pe: PageEvent, tabId: string, paginationUseList: PaginationUse<ForListBackend>[]): void {
        const paginationUse = this.getPaginationUseById(tabId, paginationUseList);
        if (paginationUse) {
            paginationUse.length = pe.length;
            paginationUse.pageSize = pe.pageSize;
            paginationUse.pageIndex = pe.pageIndex;
            this.gotToPage(paginationUseList,paginationUse.id);
            paginationUse.state.subscribe((response) => {
                paginationUse.length = response ? response.totalElements : 0;
            });
        }

    }

    gotToPage(paginationUseList: PaginationUse<ForListBackend>[], paginationUseId?: string): void {
        const elem = this.getPaginationUseById(paginationUseId ? paginationUseId : this.currentTabId, paginationUseList);
        if (elem) {
            this.changePaginationState(elem, elem.listButtonsOptions);
        }
    }

    changeTab(tabId: string, paginationUseList: PaginationUse<ForListBackend>[]) {
        this.currentTabId = tabId;
        paginationUseList.map((elem) => {
            if (elem.id === tabId) {
                elem.active = true;
            } else {
                elem.active = false;
            }
        })
    }

    setRouteToElement(route: string, paginationUse: PaginationUse<ForListBackend>): void {
        if (paginationUse) {
          paginationUse.route = route;
        }
    }

    updateCurrentTabIdPagination(paginationUseList: PaginationUse<ForListBackend>[]): void {
      console.log( "Current  id: " + this.currentTabId)
        const elem = this.getPaginationUseById(this.currentTabId, paginationUseList);
        if (elem) {
            elem.length = elem.length - 1;
            this.gotToPage(paginationUseList);
            elem.state.subscribe((response) => {
            });
        }
    }

    paginateDataWithParams$ = (route: string, body: JobOfferFilterDto | null | undefined, ifGet: boolean , page: number = 0, size: number = 5, params?: string): Observable<Page<ForListBackend>> =>
        body==null || body == undefined?
        this.http.get<Page<ForListBackend>>(`${ROUTES.BACKEND_ROUTE}${route}?page=${page}&size=${size}${params ? params : ''}`).pipe(shareReplay(1))
        :this.http.post<Page<ForListBackend>>( `${ROUTES.BACKEND_ROUTE}${route}/filter?page=${page}&size=${size}${params ? params : ''}`,
        body?body:''
    ).pipe(shareReplay(1));


}
