import {Component, EventEmitter, Input, Output} from '@angular/core';

import {MatDialog} from "@angular/material/dialog";
import {SimpleTrueFalsePopUpComponent} from "../../pop-up/simple-true-false-pop-up/simple-true-false-pop-up.component";
import {ItemInsideList} from "../../../types";


@Component({
  selector: 'app-item-inside-list',
  templateUrl: './item-inside-list.component.html',
  styleUrls: ['./item-inside-list.component.scss']
})
export class ItemInsideListComponent {
  @Input () item: ItemInsideList | null = null;

  @Output() deleteItem = new EventEmitter<string>();

  ifDelete: boolean = false;
  constructor(public dialog: MatDialog) {}

  openDeleteItemDialog(): void {
    const dialogRef = this.dialog.open(SimpleTrueFalsePopUpComponent, {
      data:
        {
          title: "Potwierdzenie",
          mainMessage: "Czy na pewno chcesz usunąć element?",
          confirmMessage: "Tak",
          declineMessage: "Nie"
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ifDelete = result;
      if(this.ifDelete)
        this.deleteItem.emit(this.item?.id);
    });
  }
}
