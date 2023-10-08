import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizerRoutingModule } from './organizer-routing.module';
import {UtilitiesModule} from "../utilities/utilities.module";
import { OrganizerAccountComponent } from './organizer-account/organizer-account.component';


@NgModule({
  declarations: [
    OrganizerAccountComponent
  ],
  exports: [
    OrganizerAccountComponent
  ],
  imports: [
    CommonModule,
    OrganizerRoutingModule,
    UtilitiesModule
  ]
})
export class OrganizerModule { }
