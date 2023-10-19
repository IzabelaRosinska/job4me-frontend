import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WorkerAccountComponent} from "./worker-account/worker-account.component";
import {WorkerInfoFormComponent} from "./worker-account/worker-info-form/worker-info-form.component";

const routes: Routes = [
  { path: 'worker/editInfo', component: WorkerInfoFormComponent },
  {path: 'worker/account', component: WorkerAccountComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkerRoutingModule {
}
