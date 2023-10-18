import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-simple-true-false-pop-up',
  templateUrl: './simple-true-false-pop-up.component.html',
  styleUrls: ['./simple-true-false-pop-up.component.scss']
})
export class SimpleTrueFalsePopUpComponent {

  constructor(
    public dialogRef: MatDialogRef<SimpleTrueFalsePopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {title: string, mainMessage: string, confirmMessage: string, declineMessage: string}
  ){}

}
