import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ItemInsideList} from "../../types";

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
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ",
      route: "/login",
      useFavorite: true,
      isFavorite: true,
      useDelete: true
    },
    {
      image: "https://picsum.photos/100/100",
      name: "John Black",
      id: 2,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
      route: "/login",
      useFavorite: true,
      isFavorite: false,
      useDelete: false
    },
    {
      image: "https://picsum.photos/100/100",
      name: "John White",
      id: 3,
      description: "opis opis opis",
      route: "/login",
      useFavorite: false,
      useDelete: false
    }
  ];

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
  }

}
