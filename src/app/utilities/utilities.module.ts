import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemListComponent } from './item-list/item-list.component';



@NgModule({
  declarations: [
    ItemListComponent
  ],
  exports: [
    ItemListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UtilitiesModule { }
