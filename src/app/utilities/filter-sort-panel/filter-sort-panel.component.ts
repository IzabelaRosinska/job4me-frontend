import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UtilitiesService} from "../service/utilities.service";


@Component({
  selector: 'app-filter-sort-panel',
  templateUrl: './filter-sort-panel.component.html',
  styleUrls: ['./filter-sort-panel.component.scss']
})
export class FilterSortPanelComponent implements OnInit{

  @Input() filter: [string,string][] = [["Forms", "/offer/forms"],["Branch", "/offer/branch"]];
  @Input() filterOptions: [string,string[]][] = [["Forms",["All", "Active", "Inactive", "Deleted"]]];

  @Input() sortOptions: string[] = ["0 -> 100", "100 -> 0", "A-Z", "Z-A"];

  filterOptionSelected: string[] = [];
  start: boolean = false;

  @Output() filterOptionSelectedOutput:EventEmitter<string[]> = new EventEmitter<string[]>();

  @Output() sortOptionSelectedOutput:EventEmitter<string> = new EventEmitter<string>();


  constructor(private utilitiesService: UtilitiesService) {
  }

  ngOnInit(): void {
    for (let i = 0; i < this.filter.length; i++) {
      this.utilitiesService.getFilterOptions(this.filter[i][1]).subscribe((options) => {
        const pair: [string, string[]] = [this.filter[i][0], options];
        if(!this.filterOptions.find((elem) => elem[0] === pair[0])){
            this.filterOptions.push(pair);
        }
        this.start = true;
      });
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
