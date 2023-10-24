import {Component, EventEmitter, Input, Output} from '@angular/core';


@Component({
  selector: 'app-filter-sort-panel',
  templateUrl: './filter-sort-panel.component.html',
  styleUrls: ['./filter-sort-panel.component.scss']
})
export class FilterSortPanelComponent {

  @Input() filterOptions: string[] = ["All", "Active", "Inactive", "Deleted"];

  @Input() sortOptions: string[] = ["0 -> 100", "100 -> 0", "A-Z", "Z-A"];

  filterOptionSelected: string[] = [];
  @Output() filterOptionSelectedOutput:EventEmitter<string[]> = new EventEmitter<string[]>();

  @Output() sortOptionSelectedOutput:EventEmitter<string> = new EventEmitter<string>();


  constructor() {
  }

  filterOptionClicked(option: string) {
    if(!this.filterOptionSelected.includes(option)){
      this.filterOptionSelected.push(option);
    }else {
      this.filterOptionSelected = this.filterOptionSelected.filter((value) => {
        return value != option;
      })
    }
    this.filterOptionSelectedOutput.emit(this.filterOptionSelected);
  }

  sortOptionClicked(option: string) {
    this.sortOptionSelectedOutput.emit(option);
  }
}
