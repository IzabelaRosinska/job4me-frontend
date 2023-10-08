import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkerRoutingModule } from './worker-routing.module';
import {UtilitiesModule} from "../utilities/utilities.module";
import { WorkerAccountComponent } from './worker-account/worker-account.component';


@NgModule({
  declarations: [
    WorkerAccountComponent
  ],
  exports: [
    WorkerAccountComponent
  ],
  imports: [
    CommonModule,
    WorkerRoutingModule,
    UtilitiesModule
  ]
})
export class WorkerModule { }
