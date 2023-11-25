import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmployeeRoutingModule} from './employee-routing.module';
import {UtilitiesModule} from "../utilities/utilities.module";
import {EmployeeAccountComponent} from "./employee-account/employee-account.component";
import { EmployeeInfoFormComponent } from './employee-account/employee-info-form/employee-info-form.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MdbFormsModule} from "mdb-angular-ui-kit/forms";


@NgModule({
  declarations: [EmployeeAccountComponent, EmployeeInfoFormComponent],
  exports: [EmployeeAccountComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    UtilitiesModule,
    FormsModule,
    HttpClientModule,
    MdbFormsModule,
  ]
})
export class EmployeeModule {
}
