import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ItemInsideList} from "../../types";
import {filter} from "rxjs";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent {
  @Input() items: ItemInsideList[] | null = [];

  @Input() filters: [string,string][] =  []

  filterOptionsChecked: string[] = [];

  constructor() {}

  @Output() deleteItemOut = new EventEmitter<number>();
  @Output() acceptItemOut = new EventEmitter<number>();

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

  filterOptionUpdate(selectedItems: string[]) {
    this.filterOptionsChecked = selectedItems;
    console.log(this.filterOptionsChecked);
  }

}
