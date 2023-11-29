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
import {HttpClientModule} from "@angular/common/http";
import { ExpandedModuleFormComponent } from './expanded-module-form/expanded-module-form.component';
import {FormsModule} from "@angular/forms";
import { ItemListComponent } from './item-list/item-list.component';
import { ItemInsideListComponent } from './item-list/item-inside-list/item-inside-list.component';
import {RouterLink} from "@angular/router";
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { FilterSortPanelComponent } from './filter-sort-panel/filter-sort-panel.component';
import { FiltringFieldComponent } from './filter-sort-panel/filtring-field/filtring-field.component';
import {MdbFormsModule} from "mdb-angular-ui-kit/forms";
import { SavedListComponent } from './saved-list/saved-list.component';
import {MatPaginatorModule} from "@angular/material/paginator";


@NgModule({
  declarations: [
    SimpleTrueFalsePopUpComponent,
    ExpandedModuleFormComponent,
    LoadingScreenComponent,
    ItemListComponent,
    ItemInsideListComponent,
    FilterSortPanelComponent,
    FiltringFieldComponent,
    SavedListComponent
  ],
    exports: [SimpleTrueFalsePopUpComponent,
        ExpandedModuleFormComponent, LoadingScreenComponent,
        ItemInsideListComponent, ItemListComponent, FilterSortPanelComponent,
    ],
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
    FormsModule,
    RouterLink,
    MdbFormsModule,
    MatPaginatorModule
  ]
})
export class UtilitiesModule {
}
