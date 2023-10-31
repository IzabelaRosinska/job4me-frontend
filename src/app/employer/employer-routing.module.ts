import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WorkerAccountComponent} from "../worker/worker-account/worker-account.component";
import {EmployerAccountComponent} from "./employer-account/employer-account.component";

const routes: Routes = [
  {path: 'employer/account', component: EmployerAccountComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerRoutingModule { }
