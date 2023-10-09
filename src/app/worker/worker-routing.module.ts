import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WorkerAccountComponent} from "./worker-account/worker-account.component";

const routes: Routes = [
  // { path: 'worker/editInfo', component: InfoFormComponent },
  {path: 'worker/account', component: WorkerAccountComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkerRoutingModule {
}
