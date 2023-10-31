import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmployerRoutingModule} from './employer-routing.module';
import { EmployerAccountComponent } from './employer-account/employer-account.component';


@NgModule({
  declarations: [
    EmployerAccountComponent
  ],
  imports: [
    CommonModule,
    EmployerRoutingModule
  ]
})
export class EmployerModule {
}
