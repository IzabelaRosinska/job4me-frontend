import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrganizerRoutingModule} from './organizer-routing.module';
import {UtilitiesModule} from "../utilities/utilities.module";
import { OrganizerAccountComponent } from './organizer-account/organizer-account.component';
import { OrganizerInfoFormComponent } from './organizer-account/organizer-info-form/organizer-info-form.component';
import {MdbFormsModule} from "mdb-angular-ui-kit/forms";
import { JobfairComponent } from './jobfair/jobfair.component';
import { JobfairEditFormComponent } from './jobfair/jobfair-edit-form/jobfair-edit-form.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";


@NgModule({
  declarations: [
    OrganizerAccountComponent,
    OrganizerInfoFormComponent,
    JobfairComponent,
    JobfairEditFormComponent
  ],
  exports: [],
    imports: [
        CommonModule,
        OrganizerRoutingModule,
        UtilitiesModule,
        MdbFormsModule,
        MatDatepickerModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatNativeDateModule,
        MatPaginatorModule
    ]
})
export class OrganizerModule {
}
