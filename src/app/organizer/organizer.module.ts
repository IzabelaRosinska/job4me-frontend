import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrganizerRoutingModule} from './organizer-routing.module';
import {UtilitiesModule} from "../utilities/utilities.module";
import { OrganizerAccountComponent } from './organizer-account/organizer-account.component';
import { OrganizerInfoFormComponent } from './organizer-account/organizer-info-form/organizer-info-form.component';
import {FormsModule} from "@angular/forms";
import {MdbFormsModule} from "mdb-angular-ui-kit/forms";


@NgModule({
  declarations: [
    OrganizerAccountComponent,
    OrganizerInfoFormComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    OrganizerRoutingModule,
    UtilitiesModule,
    FormsModule,
    MdbFormsModule,

  ]
})
export class OrganizerModule {
}
