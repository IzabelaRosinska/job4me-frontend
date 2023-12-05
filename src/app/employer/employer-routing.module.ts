import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployerAccountComponent} from "./employer-account/employer-account.component";
import {JobOfferComponent} from "./job-offer/job-offer.component";
import {EmployerInfoFormComponent} from "./employer-account/employer-info-form/employer-info-form.component";
import {JobOfferEditFormComponent} from "./job-offer/job-offer-edit-form/job-offer-edit-form.component";

const routes: Routes = [
  {path: 'employer/account', component: EmployerAccountComponent},
  {path: 'employer/edit-form', component: EmployerInfoFormComponent},
  {path: 'employer/add-job-offer', component: JobOfferEditFormComponent},
  
  {path: 'employer/:employer-id/account', component: EmployerAccountComponent},

  {path: 'organizer/employer/:employer-id/account', component: EmployerAccountComponent},
  {path: 'organizer/employer/:employer-id', redirectTo: '/organizer/employer/:employer-id/account', pathMatch: 'full'},
  {path: 'organizer/employer/job-offer/:job-offer-id', component: JobOfferComponent},

  {path: 'employee/employer/:employer-id/account', component: EmployerAccountComponent},
  {path: 'employee/employer/:employer-id', redirectTo: '/employee/employer/:employer-id/account', pathMatch: 'full'},
  {path: 'employee/employer/job-offer/:job-offer-id', component: JobOfferComponent},

  {path: 'employer/employer/:employer-id/account', component: EmployerAccountComponent},
  {path: 'employer/employer/:employer-id', redirectTo: '/employer/employer/:employer-id/account', pathMatch: 'full'},
  {path: 'employer/employer/job-offer/:job-offer-id', component: JobOfferComponent},

  {path: 'employer/:employer-id', redirectTo: '/employer/:employer-id/account', pathMatch: 'full'},
  {path: 'employer/job-offer/:job-offer-id/edit-form', component: JobOfferEditFormComponent},
  {path: 'employer/job-offer/:job-offer-id', component: JobOfferComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerRoutingModule {
}
