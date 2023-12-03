import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./login/register/register.component";
import {TitlePageComponent} from "./title-page/title-page.component";
import {PasswordRestoringComponent} from "./login/password-restoring/password-restoring.component";

const routes: Routes = [
  {path: 'user', component: LoginComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  {path: 'register', component: RegisterComponent, pathMatch: 'full'},
  {path: 'title-page', component: TitlePageComponent, pathMatch: 'full'},
  {path: 'reset-password', component: PasswordRestoringComponent, pathMatch: 'full', data: {mode: 'email'}},
  {path: 'update-password', component: PasswordRestoringComponent, pathMatch: 'full', data: {mode: 'password'}},
  {path: '', redirectTo: '/title-page', pathMatch: 'full'},
  {path: '**', redirectTo: '/title-page', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
