import { Component } from '@angular/core';
import {VariablesService} from "../../utilities/service/variables.service";
import {waitForAsync} from "@angular/core/testing";
import {delay} from "rxjs";

@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrls: ['./admin-account.component.scss']
})
export class AdminAccountComponent  {


  loading: boolean = true;
  constructor(private variablesService: VariablesService) {
    this.getVariablesService().initVariables();
    this.waitForLoad();
  }

  getVariablesService(): VariablesService {
    return this.variablesService;
  }

  waitForLoad(){
    setTimeout(
      () => {
        console.log('variables loaded');
        this.loading = false;
      }, 1000
    );


  }

}
