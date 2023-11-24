import {Component, EventEmitter, Input, Output} from '@angular/core';
import {VariablesService} from "../../service/variables.service";
import {FiliterType} from "../../../types";

@Component({
  selector: 'app-filtring-field',
  templateUrl: './filtring-field.component.html',
  styleUrls: ['./filtring-field.component.scss']
})
export class FiltringFieldComponent {


  @Input() title: FiliterType = FiliterType.offerName;
  @Input() options: string[] = [];
  filterOptionSelected: string[] = [];

  @Output() optionsSelectedOutput: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() textOutput: EventEmitter<string> = new EventEmitter<string>();


  constructor(private variablesService: VariablesService){

  }

  getCorrectTitleName(title: FiliterType): string {
    return this.variablesService.filterTranslations[title];
  }

  filterOptionClicked(option: string) {
    if(!this.filterOptionSelected.includes(option)){
      this.filterOptionSelected.push(option);
    }else {
      this.filterOptionSelected = this.filterOptionSelected.filter((value) => {
        return value != option;
      })
    }
    this.optionsSelectedOutput.emit(this.filterOptionSelected);
  }

  textChanged(text: string) {
    this.textOutput.emit(text);
    this.optionsSelectedOutput.emit([text]);
  }
}
