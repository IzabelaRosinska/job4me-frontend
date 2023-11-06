import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployerAccountComponent} from "./employer-account/employer-account.component";
import {EmployerInfoFormComponent} from "./employer-account/employer-info-form/employer-info-form.component";
import {JobOfferComponent} from "./job-offer/job-offer.component";

const routes: Routes = [
  {path: 'employer/account', component: EmployerAccountComponent},
  {path: 'employer/editInfo', component: EmployerInfoFormComponent},
  {path: 'employer/job-offers/:id', component: JobOfferComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerRoutingModule { }
