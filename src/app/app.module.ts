import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {WorkerModule} from "./worker/worker.module";
import {OrganizerModule} from "./organizer/organizer.module";
import {EmployerModule} from "./employer/employer.module";
import {UtilitiesModule} from "./utilities/utilities.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    WorkerModule,
    OrganizerModule,
    EmployerModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
