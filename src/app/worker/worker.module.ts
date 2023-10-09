import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WorkerRoutingModule} from './worker-routing.module';
import {UtilitiesModule} from "../utilities/utilities.module";


@NgModule({
  declarations: [],
  exports: [],
  imports: [
    CommonModule,
    WorkerRoutingModule,
    UtilitiesModule
  ]
})
export class WorkerModule {
}
