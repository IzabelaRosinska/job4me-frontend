import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EmployeeModule} from "./employee/employee.module";
import {OrganizerModule} from "./organizer/organizer.module";
import {EmployerModule} from "./employer/employer.module";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppNavComponent} from './app-nav/app-nav.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {LoginComponent} from './login/login.component';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RequestInterceptor} from "./interceptors/request.interceptor";
import {RegisterComponent} from './login/register/register.component';
import {MdbCheckboxModule} from 'mdb-angular-ui-kit/checkbox';
import {MdbDropdownModule} from 'mdb-angular-ui-kit/dropdown';
import {MdbFormsModule} from 'mdb-angular-ui-kit/forms';
import {MdbModalModule} from 'mdb-angular-ui-kit/modal';
import {MdbPopoverModule} from 'mdb-angular-ui-kit/popover';
import {MdbRadioModule} from 'mdb-angular-ui-kit/radio';
import {MdbRangeModule} from 'mdb-angular-ui-kit/range';
import {MdbValidationModule} from 'mdb-angular-ui-kit/validation';
import {FooterComponent} from './footer/footer.component';
import {MatInputModule} from '@angular/material/input';
import { TitlePageComponent } from './title-page/title-page.component';
import { JobfairSearchingPanelComponent } from './jobfair-searching-panel/jobfair-searching-panel.component';
import {UtilitiesModule} from "./utilities/utilities.module";
import {MatPaginatorModule} from "@angular/material/paginator";
import {SavedListComponent} from "./utilities/saved-list/saved-list.component";


@NgModule({
  declarations: [
    AppNavComponent,
    LoginComponent,
    RegisterComponent,
    AppComponent,
    FooterComponent,
    TitlePageComponent,
    JobfairSearchingPanelComponent,
  ],
  imports: [
    HttpClientModule,
    NgbModule,
    UtilitiesModule,
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
    BrowserAnimationsModule,
    MdbCheckboxModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbValidationModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule
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
export class AppModule {
}
