import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FiliterType, ItemInsideList} from "../../types";
import {filter} from "rxjs";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent {
  @Input() items: ItemInsideList[] | null = [];

  @Input() filters: FiliterType[] =  []

  filterOptionsChecked: [FiliterType,string[]][] = [];

  constructor() {}

  @Output() deleteItemOut = new EventEmitter<number>();
  @Output() acceptItemOut = new EventEmitter<number>();
  @Output() filterOptionSelectedOutput: EventEmitter<[FiliterType,string[]][]> = new EventEmitter<[FiliterType,string[]][]>();

  deleteItem(id: number): void {
    if(this.items){
      this.items = this.items?.filter((item) => item.id !== id);
      this.deleteItemOut.emit(id);
    }
  }

  acceptItem(id: number): void {
    if(this.items){
      this.items = this.items?.filter((item) => item.id !== id);
      this.acceptItemOut.emit(id);
    }
  }

  filterOptionUpdate(selectedItems: [FiliterType,string[]][]) {
    this.filterOptionsChecked = selectedItems;
    console.log(this.filterOptionsChecked);
    this.filterOptionSelectedOutput.emit(this.filterOptionsChecked);
  }

}
