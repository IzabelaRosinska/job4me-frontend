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

  @Input() useSorting: boolean = true;
  @Input() filter: FiliterType[] = [];
  @Input() filterOptions: [FiliterType, string[]][] = [];

  @Input() sortOptions: Record<string, number> = {};
  sortOptionsString: string[] = [];

  filterOptionSelected: string[] = [];
  start: boolean = false;

  filtringFieldComponents: FiltringFieldComponent[] = [];

  isFilterPanelOpen: boolean = false;

  @ViewChild('item') myInput!: ElementRef;


  @Output() filterOptionSelectedOutput: EventEmitter<[FiliterType, string[]][]> = new EventEmitter<[FiliterType, string[]][]>();
  filterOptionSelectedOutputPrepare: [FiliterType, string[]][] = [];

  @Output() sortOptionSelectedOutput: EventEmitter<number> = new EventEmitter<number>();
  currentSortOption: string = '';


  constructor(private variablesService: VariablesService,
              private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.variablesService.initVariables();
    for (let i = 0; i < this.filter.length; i++) {
      const filterName = this.filter[i];
      if (this.variablesService.dictionaryIfLoaded[filterName]) {
        const pair: [FiliterType, string[]] = [filterName, this.variablesService.getLoadedData(filterName)];
        this.filterOptions.push(pair);
        this.start = true;
      } else {
        const pair: [FiliterType, string[]] = [filterName, []];
        this.filterOptions.push(pair);
        this.start = true;
      }
      this.filterOptionSelectedOutputPrepare.push([this.filter[i], []]);
    }
    this.sortOptionsString = Object.keys(this.sortOptions);
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
    this.currentSortOption = option;
    this.sortOptionSelectedOutput.emit(this.sortOptions[option]);
  }

}
