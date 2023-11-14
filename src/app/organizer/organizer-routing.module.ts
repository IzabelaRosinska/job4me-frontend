import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrganizerAccountComponent} from "./organizer-account/organizer-account.component";

const routes: Routes = [
  { path: 'organizer/account', component: OrganizerAccountComponent },
  { path: 'employer/organizer/:organizer-id/account', component: OrganizerAccountComponent },
  { path: 'employee/organizer/:organizer-id/account', component: OrganizerAccountComponent },
  { path: 'organizer',redirectTo: 'organizer/account', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizerRoutingModule { }
