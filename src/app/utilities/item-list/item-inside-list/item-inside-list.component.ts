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

  @Output() deleteItem = new EventEmitter<number>();
  @Output() acceptItem = new EventEmitter<number>();


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
      const ifDelete = result;
      if(ifDelete)
        this.deleteItem.emit(this.item?.id);
    });
  }


  openConfirmItemDialog(): void {

    const dialogRef = this.dialog.open(SimpleTrueFalsePopUpComponent, {
      data:
        {
          title: "Potwierdzenie",
          mainMessage: "Czy na pewno chcesz dodać element?",
          confirmMessage: "Tak",
          declineMessage: "Nie"
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      const ifAccept = result;
      if(ifAccept)
        this.acceptItem.emit(this.item?.id);
    });
  }
}
