import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmployerRoutingModule} from './employer-routing.module';
import { EmployerAccountComponent } from './employer-account/employer-account.component';
import { EmployerInfoFormComponent } from './employer-account/employer-info-form/employer-info-form.component';
import {FormsModule} from "@angular/forms";
import {UtilitiesModule} from "../utilities/utilities.module";
import { JobOfferComponent } from './job-offer/job-offer.component';
import { JobOfferCardComponent } from './job-offer/job-offer-card/job-offer-card.component';


@NgModule({
  declarations: [
    EmployerAccountComponent,
    EmployerInfoFormComponent,
    JobOfferComponent,
    JobOfferCardComponent
  ],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    FormsModule,
    UtilitiesModule
  ]
})
export class EmployerModule {
}
