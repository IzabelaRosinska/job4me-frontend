import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrganizerAccountComponent} from "./organizer-account/organizer-account.component";
import {OrganizerInfoFormComponent} from "./organizer-account/organizer-info-form/organizer-info-form.component";
import {InputFieldComponent} from "../utilities/input-field/input-field.component";
import {MdbFormsModule} from "mdb-angular-ui-kit/forms";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {JobfairComponent} from "./jobfair/jobfair.component";

const routes: Routes = [
  { path: 'organizer/account', component: OrganizerAccountComponent },
  { path: 'employer/organizer/:organizer-id/account', component: OrganizerAccountComponent },
  { path: 'employee/organizer/:organizer-id/account', component: OrganizerAccountComponent },
  { path: 'employer/organizer/:organizer-id/job-fair/:jobfair-id', component: JobfairComponent },
  { path: 'employee/organizer/:organizer-id/job-fair/:jobfair-id', component: JobfairComponent },
  { path: 'organizer',redirectTo: 'organizer/account', pathMatch: 'full' },
  { path: 'organizer/edit-info', component: OrganizerInfoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes), MdbFormsModule, FormsModule, NgIf],
  declarations: [
    InputFieldComponent
  ],
  exports: [RouterModule, InputFieldComponent]
})
export class OrganizerRoutingModule { }
