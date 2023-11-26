import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FiliterType} from "../../types";
import {VariablesService} from "../service/variables.service";
import {FiltringFieldComponent} from "./filtring-field/filtring-field.component";


@Component({
  selector: 'app-filter-sort-panel',
  templateUrl: './filter-sort-panel.component.html',
  styleUrls: ['./filter-sort-panel.component.scss']
})
export class FilterSortPanelComponent implements OnInit {

  @Input() filter: FiliterType[] = [];
  @Input() filterOptions: [FiliterType, string[]][] = [];

  @Input() sortOptions: string[] = [];

  filterOptionSelected: string[] = [];
  start: boolean = false;

  filtringFieldComponents: FiltringFieldComponent[] = [];

  isFilterPanelOpen: boolean = false;

  @ViewChild('item') myInput!: ElementRef;


  @Output() filterOptionSelectedOutput: EventEmitter<[FiliterType, string[]][]> = new EventEmitter<[FiliterType, string[]][]>();
  filterOptionSelectedOutputPrepare: [FiliterType, string[]][] = [];

  @Output() sortOptionSelectedOutput: EventEmitter<number> = new EventEmitter<number>();


  constructor(private variablesService: VariablesService,
              private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.variablesService.initVariables();
    for (let i = 0; i < this.filter.length; i++) {
      const filterName = this.filter[i];
      // console.log(filterName + " " + this.variablesService.dictionaryIfLoaded[filterName]);
      if (this.variablesService.dictionaryIfLoaded[filterName]) {
        console.log(this.variablesService.dictionaryOfLoadedData[filterName] + " " + filterName + " " + this.variablesService.dictionaryOfLoadedData["industryNames"]);
        const pair: [FiliterType, string[]] = [filterName, this.variablesService.dictionaryOfLoadedData[filterName]];
        this.filterOptions.push(pair);
        this.start = true;
      } else {
        const pair: [FiliterType, string[]] = [filterName, []];
        this.filterOptions.push(pair);
        this.start = true;
      }
      this.filterOptionSelectedOutputPrepare.push([this.filter[i], []]);
    }
    this.sortOptions = this.variablesService.getSortingOffersOptionsStrings();
    this.isFilterPanelOpen = true;
  }

  findfilterOptionSelectedOutputPrepare(title: FiliterType): number {
    for (let i = 0; i < this.filterOptionSelectedOutputPrepare.length; i++) {
      if (this.filterOptionSelectedOutputPrepare[i][0] == title) {
        return i;
      }
    }
    return -1;
  }

  filterOptionClicked(title: FiliterType, options: string[]) {
    const index = this.findfilterOptionSelectedOutputPrepare(title);
    if (index != -1) {
      this.filterOptionSelectedOutputPrepare[index][1] = options;
    }
    // this.filterOptionSelectedOutput.emit(this.filterOptionSelectedOutputPrepare);
  }

  isSelectedNothing(): boolean {
    for (let i = 0; i < this.filterOptionSelectedOutputPrepare.length; i++) {
      if (this.filterOptionSelectedOutputPrepare[i][1].length > 0) {
        return false;
      }
    }
    return true;
  }

  clearFilters() {

    for (let i = 0; i < this.filterOptionSelectedOutputPrepare.length; i++) {
      this.filterOptionSelectedOutputPrepare[i][1] = [];
    }
    this.isFilterPanelOpen = false;
    setTimeout(() => {
      this.isFilterPanelOpen = true;
    }, 1);
    this.filterOptionSelectedOutput.emit(this.filterOptionSelectedOutputPrepare);
  }

  useFilters() {
    this.filterOptionSelectedOutput.emit(this.filterOptionSelectedOutputPrepare);
  }



  sortOptionClicked(option: string) {
    this.sortOptionSelectedOutput.emit(this.variablesService.sortOffersOptions[option]);
  }

}
