import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployerAccountComponent} from "./employer-account/employer-account.component";
import {JobOfferComponent} from "./job-offer/job-offer.component";
import {EmployerInfoFormComponent} from "./employer-account/employer-info-form/employer-info-form.component";
import {JobOfferEditFormComponent} from "./job-offer/job-offer-edit-form/job-offer-edit-form.component";

const routes: Routes = [
  {path: 'employer/account', component: EmployerAccountComponent},
  {path: 'employer/offer/:id/editForm', component: JobOfferEditFormComponent},
  {path: 'employer/offer/:id', component: JobOfferComponent},
  {path: 'employer/editInfo', component: EmployerInfoFormComponent},
  {path: 'employer/job-offers/:id', component: JobOfferComponent},
  {path: 'employer/offerEditForm', component: JobOfferEditFormComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerRoutingModule { }
