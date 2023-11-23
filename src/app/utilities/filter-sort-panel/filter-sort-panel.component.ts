import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UtilitiesService} from "../service/utilities.service";
import {BehaviorSubject, Observable} from "rxjs";
import {FiliterType, JobOffer, Page} from "../../types";
import {HttpErrorResponse} from "@angular/common/http";
import {VariablesService} from "../service/variables.service";


@Component({
  selector: 'app-filter-sort-panel',
  templateUrl: './filter-sort-panel.component.html',
  styleUrls: ['./filter-sort-panel.component.scss']
})
export class FilterSortPanelComponent implements OnInit {

  @Input() filter: FiliterType[] = [];
  @Input() filterOptions: [string, string[]][] = [];

  @Input() sortOptions: string[] = ["0 -> 100", "100 -> 0", "A-Z", "Z-A"];

  filterOptionSelected: string[] = [];
  start: boolean = false;

  @Output() filterOptionSelectedOutput: EventEmitter<[string,string[]][]> = new EventEmitter<[string,string[]][]>();
  filterOptionSelectedOutputPrepare: [string,string[]][] = [];

  @Output() sortOptionSelectedOutput: EventEmitter<string> = new EventEmitter<string>();

  state$!: Observable<{ appState: string, appData?: Page<string[]>, error?: HttpErrorResponse }>;
  responseSubject = new BehaviorSubject<Page<string[]>>({} as Page<string[]>);
  private currentPageSubject = new BehaviorSubject<number>(0);

  constructor(private utilitiesService: UtilitiesService,
              private variablesService: VariablesService) {
  }

  ngOnInit(): void {
    for (let i = 0; i < this.filter.length; i++) {
      const filterName = this.filter[i];
      console.log(filterName + " " + this.variablesService.dictionaryIfLoaded[filterName]);
      if(this.variablesService.dictionaryIfLoaded[filterName]){
        console.log(this.variablesService.dictionaryOfLoadedData[filterName] + " " + filterName+ " " + this.variablesService.dictionaryOfLoadedData["industryNames"]);
        const pair: [string, string[]] = [filterName, this.variablesService.dictionaryOfLoadedData[filterName]];
        this.filterOptions.push(pair);
        this.start = true;
      }else{
        const pair: [string, string[]] = [filterName,[]];
        this.filterOptions.push(pair);
        this.start = true;
      }
      // if (this.filter[i][1] !== "") {
      //   this.utilitiesService.getFilterOptions(this.filter[i][1]).subscribe((options) => {
      //     const pair: [string, string[]] = [this.filter[i][0], options.content.map((elem) => elem.name) as string[]];
      //     this.filterOptions.push(pair);
      //     this.start = true;
      //   });
      // } else {
      //   const pair: [string, string[]] = [this.filter[i][0], []];
      //   this.filterOptions.push(pair);
      //   this.start = true;
      // }


      this.filterOptionSelectedOutputPrepare.push([this.filter[i],[]]);
    }
  }

  findfilterOptionSelectedOutputPrepare(title: string): number {
    for (let i = 0; i < this.filterOptionSelectedOutputPrepare.length; i++) {
      if (this.filterOptionSelectedOutputPrepare[i][0] == title) {
        return i;
      }
    }
    return -1;
  }

  filterOptionClicked(title: string, options: string[]) {
    const index = this.findfilterOptionSelectedOutputPrepare(title);
    if(index != -1) {
      this.filterOptionSelectedOutputPrepare[index][1] = options;
    }
    this.filterOptionSelectedOutput.emit(this.filterOptionSelectedOutputPrepare);
  }

  sortOptionClicked(option: string) {
    this.sortOptionSelectedOutput.emit(option);
  }

  print(text: string) {
    console.log(text)
  }


}
