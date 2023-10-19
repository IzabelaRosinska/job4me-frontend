import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WorkerRoutingModule} from './worker-routing.module';
import {UtilitiesModule} from "../utilities/utilities.module";
import {WorkerAccountComponent} from "./worker-account/worker-account.component";
import { WorkerInfoFormComponent } from './worker-account/worker-info-form/worker-info-form.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [WorkerAccountComponent, WorkerInfoFormComponent],
  exports: [WorkerAccountComponent],
  imports: [
    CommonModule,
    WorkerRoutingModule,
    UtilitiesModule,
    FormsModule
  ]
})
export class WorkerModule {
}
