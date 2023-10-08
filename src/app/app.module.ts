import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {WorkerModule} from "./worker/worker.module";
import {OrganizerModule} from "./organizer/organizer.module";
import {EmployerModule} from "./employer/employer.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppNavComponent } from './app-nav/app-nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {WorkerAccountComponent} from "./worker/worker-account/worker-account.component";
import {UtilitiesModule} from "./utilities/utilities.module";

@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    WorkerAccountComponent
  ],
  imports: [
    BrowserModule,
    WorkerModule,
    OrganizerModule,
    EmployerModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }