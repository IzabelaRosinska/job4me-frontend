import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeAccountComponent} from "./employee-account/employee-account.component";
import {EmployeeInfoFormComponent} from "./employee-account/employee-info-form/employee-info-form.component";
import {SavedListComponent} from "../utilities/saved-list/saved-list.component";

const routes: Routes = [
  {path: 'employee/editInfo', component: EmployeeInfoFormComponent},
  {path: 'employee/account', component: EmployeeAccountComponent},
  {path: 'employee', redirectTo: 'employee/account'},
  {path: 'employee/saved-employers', component: SavedListComponent, data: {routeMainPart: 'saved/employers', routeToElement: '/employee/employer/', routeToDelete: 'delete-employer'}},
  {path: 'employee/saved-job-offers', component: SavedListComponent, data: {routeMainPart: 'saved/offers', routeToElement: '/employee/employer/job-offer/', routeToDelete: 'delete-offer'}},

  {path: 'organizer/employee/:employee-id/account', component: EmployeeAccountComponent},
  {path: 'organizer/employee/:employee-id', redirectTo: 'organizer/employee/:employee-id/account'},

  {path: 'employer/employee/:employee-id/account', component: EmployeeAccountComponent},
  {path: 'employer/employee/:employee-id', redirectTo: 'employer/employee/:employee-id/account'},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {
}
