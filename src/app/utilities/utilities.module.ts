import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { SimpleTrueFalsePopUpComponent } from './pop-up/simple-true-false-pop-up/simple-true-false-pop-up.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { ExpandedModuleFormComponent } from './expanded-module-form/expanded-module-form.component';
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    SimpleTrueFalsePopUpComponent,
    ExpandedModuleFormComponent
  ],
  exports: [SimpleTrueFalsePopUpComponent,
    ExpandedModuleFormComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatInputModule,
    HttpClientModule,
    FormsModule
  ]
})
export class UtilitiesModule {
}
