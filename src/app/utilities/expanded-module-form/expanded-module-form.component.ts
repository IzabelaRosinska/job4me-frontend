import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-expanded-module-form',
  templateUrl: './expanded-module-form.component.html',
  styleUrls: ['./expanded-module-form.component.scss']
})
export class ExpandedModuleFormComponent {
  @Input () title: string | null = "";

  @Input () maxInputLength: number = 100;
  @Input () maxInputCount: number = 3;

  @Output () save: EventEmitter<string[]> = new EventEmitter<string[]>();

  listOfTexts: string[] = [];

  newText: string = "";

  newTextInputVisibile: boolean = false;

  questionHide: boolean = false;

  arrowImgSrc = "../../assets/arrow.png";
  pencilImgSrc = "../../assets/Anonymous-Pencil-icon.png";

  rotate: string = "rotate: 90deg";

  editMode: number = -1;

  fileToUpload: File | null = null;



  constructor() {

  }


  addText(index?: number) {
    this.newTextInputVisibile = false;
    this.editMode = -1;

    if(index == undefined) {
      if (this.newText == "") return;
      this.listOfTexts.push(this.newText);
    }
    else {
      if(this.newText == ""){
        this.listOfTexts = this.listOfTexts.filter((value, listIndex) => listIndex != index);
        return;
      }
      this.listOfTexts[index] = this.newText;
    }

    this.newText = "";
    this.save.emit(this.listOfTexts);
  }

  toggleQuestion1() {
    this.questionHide = !this.questionHide;
    this.questionHide ? this.rotate = "rotate: 0deg" : this.rotate = "rotate: 90deg";
  }

  startAddingNewText() {
    if(this.listOfTexts.length >= this.maxInputCount) return;
    this.newTextInputVisibile = true;
  }

  editText(index: number) {
    this.editMode = index;
    this.newText = this.listOfTexts[index];
  }

  buttonColor(){
    return this.maxInputCount>this.listOfTexts.length ? "primary" : "danger";
  }

}
