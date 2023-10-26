import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-expanded-module-form',
  templateUrl: './expanded-module-form.component.html',
  styleUrls: ['./expanded-module-form.component.scss']
})
export class ExpandedModuleFormComponent implements OnInit {
  @Input () title: string | null = "";

  @Input () maxInputLength: number = 100;
  @Input () maxInputCount: number = 10;

  @Output () save: EventEmitter<string[]> = new EventEmitter<string[]>();

  @Input ()listOfTexts: string[] = [];

  listOfTextsWithIndexes: [string,| number][] = [];

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

  ngOnInit(): void {
    this.listOfTextsWithIndexes = this.listOfTexts.map((value, index) => [value, index]);
    console.log(this.listOfTextsWithIndexes);
  }



  addText(index?: number) {
    this.newTextInputVisibile = false;
    this.editMode = -1;

    if(index == undefined) {
      if (this.newText == "") return;
      this.listOfTextsWithIndexes.push([this.newText, this.listOfTextsWithIndexes.length]);
    }
    else {
      if(this.newText == ""){
        this.listOfTextsWithIndexes = this.listOfTextsWithIndexes.filter((value, listIndex) => listIndex != index);
        return;
      }
      this.listOfTextsWithIndexes[index] = [this.newText, index];
    }

    this.newText = "";
    this.save.emit(this.listOfTextsWithIndexes.map((value) => value[0]));
  }

  toggleQuestion1() {
    this.questionHide = !this.questionHide;
    this.questionHide ? this.rotate = "rotate: 0deg" : this.rotate = "rotate: 90deg";
  }

  startAddingNewText() {
    if(this.listOfTextsWithIndexes.length >= this.maxInputCount) return;
    this.newTextInputVisibile = true;
  }

  editText(index: number) {
    this.editMode = index;
    this.newText = this.listOfTextsWithIndexes[index][0];
  }

  buttonColor(){
    return this.maxInputCount>this.listOfTextsWithIndexes.length ? "primary" : "danger";
  }

}
