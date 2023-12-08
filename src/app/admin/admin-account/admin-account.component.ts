import { Component } from '@angular/core';
import {VariablesService} from "../../utilities/service/variables.service";
import {waitForAsync} from "@angular/core/testing";
import {catchError, delay} from "rxjs";
import {idNameListElement} from "../../types";

@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrls: ['./admin-account.component.scss']
})
export class AdminAccountComponent  {


  loading: boolean = true;
  message: string = "";
  basicErrorMessage: string = "Nie udało się usunąć %s. Prawdopodobnie jest ona przypisana do oferty. Odśwież stronę."
  constructor(private variablesService: VariablesService) {
    this.getVariablesService().initVariables();
    this.loading = false;
  }

  getVariablesService(): VariablesService {
    return this.variablesService;
  }

  getNewElement(smallerArray: string[], biggerArray: string[]): string {
    if (biggerArray.length == 0) return "";
    for(let i = 0; i < biggerArray.length; i++){
      if(!smallerArray.includes(biggerArray[i])) return biggerArray[i];
    }
    return "";
  }
  
  save(newList: string[], originList: string[], originListWithId: idNameListElement[], endpoint: string, message: string){
    if(originList.length == newList.length)
      return;

    if(originList.length > newList.length){
      const element = this.getNewElement(newList, originList);
      const id = this.getVariablesService().getIdOfElementFromList(originListWithId, element);
      if(id == undefined) return;
      this.getVariablesService().deleteBasic(endpoint, id).pipe(
        catchError(err => {
          this.message = this.basicErrorMessage.replace("%s", message);
          return err;
        })
      ).subscribe( response => {
          this.getVariablesService().updateBasic(endpoint);
      });
    }
    else{
      const element = this.getNewElement(originList, newList)
      this.getVariablesService().postBasic(endpoint, element).subscribe( response => {
          this.getVariablesService().updateBasic(endpoint);
      });
    }
  }

}
