import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UtilitiesService} from "../service/utilities.service";
import {BehaviorSubject, Observable} from "rxjs";
import {JobOffer, Page} from "../../types";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-filter-sort-panel',
  templateUrl: './filter-sort-panel.component.html',
  styleUrls: ['./filter-sort-panel.component.scss']
})
export class FilterSortPanelComponent implements OnInit{

  @Input() filter: [string,string][] = [];
  @Input() filterOptions: [string,string[]][] = [];

  @Input() sortOptions: string[] = ["0 -> 100", "100 -> 0", "A-Z", "Z-A"];

  filterOptionSelected: string[] = [];
  start: boolean = false;

  @Output() filterOptionSelectedOutput:EventEmitter<string[]> = new EventEmitter<string[]>();

  @Output() sortOptionSelectedOutput:EventEmitter<string> = new EventEmitter<string>();

  state$!: Observable<{ appState: string, appData?: Page<string[]>, error?: HttpErrorResponse }>;
  responseSubject = new BehaviorSubject<Page<string[]>>({} as Page<string[]>);
  private currentPageSubject = new BehaviorSubject<number>(0);
  constructor(private utilitiesService: UtilitiesService) {
  }

  ngOnInit(): void {
    for (let i = 0; i < this.filter.length; i++) {
      if(this.filter[i][1] !== ""){
        this.utilitiesService.getFilterOptions(this.filter[i][1]).subscribe((options) => {
          const pair: [string, string[]] = [this.filter[i][0], options.content.map((elem) => elem.name)  as string[]];
          this.filterOptions.push(pair);
          this.start = true;
        });
      }else{
        const pair: [string, string[]] = [this.filter[i][0], []];
        this.filterOptions.push(pair);
        this.start = true;
      }

    }


    console.log(this.filterOptions)
    console.log(this.filter)
  }

  filterOptionClicked(options: string[]) {
    this.filterOptionSelectedOutput.emit(options);
  }

  sortOptionClicked(option: string) {
    this.sortOptionSelectedOutput.emit(option);
  }

  print(text: string) {
    console.log(text)
  }


}
