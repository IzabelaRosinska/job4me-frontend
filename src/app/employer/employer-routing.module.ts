import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployerAccountComponent} from "./employer-account/employer-account.component";
import {JobOfferComponent} from "./job-offer/job-offer.component";
import {EmployerInfoFormComponent} from "./employer-account/employer-info-form/employer-info-form.component";
import {JobOfferEditFormComponent} from "./job-offer/job-offer-edit-form/job-offer-edit-form.component";

const routes: Routes = [
  {path: 'employer/account', component: EmployerAccountComponent},
  {path: 'employer/:employer-id/account', component: EmployerAccountComponent},
  {path: 'organizer/employer/:employer-id/account', component: EmployerAccountComponent},
  {path: 'employee/employer/:employer-id/account', component: EmployerAccountComponent},
  {path: 'employer/:employer-id/account', component: EmployerAccountComponent},
  {path: 'employer/job-offer/:id/edit-form', component: JobOfferEditFormComponent},
  {path: 'employer/job-offer/:id', component: JobOfferComponent},
  {path: 'employer/editInfo', component: EmployerInfoFormComponent},
  {path: 'employer/add-job-offer', component: JobOfferEditFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerRoutingModule {
}
