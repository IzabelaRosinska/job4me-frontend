import {Component, Input} from '@angular/core';
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
      id: "000001",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ",
      route: "/login",
      useFavorite: true,
      isFavorite: true,
      useDelete: true
    },
    {
      image: "https://picsum.photos/100/100",
      name: "John Black",
      id: "000002",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
      route: "/login",
      useFavorite: true,
      isFavorite: false,
      useDelete: false
    },
    {
      image: "https://picsum.photos/100/100",
      name: "John White",
      id: "000003",
      description: "opis opis opis",
      route: "/login",
      useFavorite: false,
      useDelete: false
    }
  ];

  constructor() {

  }


  deleteItem(id: string): void {
    if(this.items)
      this.items = this.items?.filter((item) => item.id !== id);
  }


}
