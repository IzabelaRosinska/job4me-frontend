import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {EmployeeModule} from "./employee/employee.module";
import {OrganizerModule} from "./organizer/organizer.module";
import {EmployerModule} from "./employer/employer.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppNavComponent } from './app-nav/app-nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LoginComponent } from './login/login.component';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS,  HttpClientModule} from "@angular/common/http";
import {RequestInterceptor} from "./interceptors/request.interceptor";
import { RegisterComponent } from './login/register/register.component';
import {UtilitiesModule} from "./utilities/utilities.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import { TestBed } from '@angular/core/testing';
import {LoginService} from "./login/service/login.service";


@NgModule({
  declarations: [
    AppNavComponent,
    LoginComponent,
    RegisterComponent,
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    NgbModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    CommonModule,
    BrowserModule,
    EmployeeModule,
    OrganizerModule,
    EmployerModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
