import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmployerRoutingModule} from './employer-routing.module';
import { EmployerAccountComponent } from './employer-account/employer-account.component';
import { EmployerInfoFormComponent } from './employer-account/employer-info-form/employer-info-form.component';
import {FormsModule} from "@angular/forms";
import {UtilitiesModule} from "../utilities/utilities.module";
import { JobOfferComponent } from './job-offer/job-offer.component';
import { JobOfferCardComponent } from './job-offer/job-offer-card/job-offer-card.component';
import { JobOfferEditFormComponent } from './job-offer/job-offer-edit-form/job-offer-edit-form.component';
import {MatPaginatorModule} from "@angular/material/paginator";


@NgModule({
  declarations: [
    EmployerAccountComponent,
    EmployerInfoFormComponent,
    JobOfferComponent,
    JobOfferCardComponent,
    JobOfferEditFormComponent
  ],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    UtilitiesModule,
    FormsModule,
    MatPaginatorModule
  ]
})
export class EmployerModule {
}
