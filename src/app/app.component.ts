import { Component } from '@angular/core';
import {VariablesService} from "./utilities/service/variables.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'job4me';

  constructor(private variablesService: VariablesService) {
    this.variablesService.initVariables();
  }
}
