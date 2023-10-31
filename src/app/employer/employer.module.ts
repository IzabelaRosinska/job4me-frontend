import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmployerRoutingModule} from './employer-routing.module';
import { EmployerAccountComponent } from './employer-account/employer-account.component';
import {UtilitiesModule} from "../utilities/utilities.module";


@NgModule({
  declarations: [
    EmployerAccountComponent
  ],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    UtilitiesModule
  ]
})
export class EmployerModule {
}
