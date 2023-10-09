import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrganizerRoutingModule} from './organizer-routing.module';
import {UtilitiesModule} from "../utilities/utilities.module";


@NgModule({
  declarations: [],
  exports: [],
  imports: [
    CommonModule,
    OrganizerRoutingModule,
    UtilitiesModule
  ]
})
export class OrganizerModule {
}
