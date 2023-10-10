import {Component, Input} from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-cv-form-element',
  templateUrl: './cv-form-element.component.html',
  styleUrls: ['./cv-form-element.component.scss']
})
export class CvFormElementComponent {

  @Input () title: string | null = "";

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


  postFile(fileToUpload: File): Observable<boolean> | null {
    const endpoint = 'your-destination-url';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return  null;
    // this.httpClient
    //   .post(endpoint, formData, { headers: this.yourHeadersConfig })
    //   .map(() => { return true; })
    //   .catch((e) => this.handleError(e));
  }

  handleFileInput(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      console.log("FileUpload -> files", fileList);
    }
  }

  listOfTexts: string[] = ["text"];

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
  }

  toggleQuestion1() {
    this.questionHide = !this.questionHide;
    this.questionHide ? this.rotate = "rotate: 0deg" : this.rotate = "rotate: 90deg";
  }

  startAddingNewText() {
    this.newTextInputVisibile = true;
  }

  editText(index: number) {
    this.editMode = index;
    this.newText = this.listOfTexts[index];
  }

}
