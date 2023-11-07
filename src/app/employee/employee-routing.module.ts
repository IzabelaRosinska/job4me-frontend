import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeAccountComponent} from "./employee-account/employee-account.component";
import {EmployeeInfoFormComponent} from "./employee-account/employee-info-form/employee-info-form.component";

const routes: Routes = [
  { path: 'employee/editInfo', component: EmployeeInfoFormComponent },
  {path: 'employee/account', component: EmployeeAccountComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {
}
