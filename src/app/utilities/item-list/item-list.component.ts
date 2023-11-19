import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ItemInsideList} from "../../types";
import {filter} from "rxjs";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent {
  @Input() items: ItemInsideList[] | null = [
    {
      image: "https://picsum.photos/100/100",
      name: "John Gray",
      id: 1,
      displayDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ",
      route: "/login",
      useSaved: true,
      isSaved: true,
      useDelete: true
    },
    {
      image: "https://picsum.photos/100/100",
      name: "John Black",
      id: 2,
      displayDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
      route: "/login",
      useSaved: true,
      isSaved: false,
      useDelete: false
    },
    {
      image: "https://picsum.photos/100/100",
      name: "John White",
      id: 3,
      displayDescription: "opis opis opis",
      route: "/login",
      useSaved: false,
      useDelete: false
    }
  ];

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
