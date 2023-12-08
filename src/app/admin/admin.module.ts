import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAccountComponent } from './admin-account/admin-account.component';
import {UtilitiesModule} from "../utilities/utilities.module";



@NgModule({
  declarations: [
    AdminAccountComponent
  ],
  imports: [
    CommonModule,
    UtilitiesModule
  ]
})
export class AdminModule { }
