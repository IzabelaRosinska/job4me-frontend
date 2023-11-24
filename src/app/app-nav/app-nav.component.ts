import {Component, inject} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {LoginService} from "../login/service/login.service";


@Component({
  selector: 'app-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.scss']
})
export class AppNavComponent {
  private breakpointObserver = inject(BreakpointObserver);


   constructor(private loginService: LoginService) {
       console.log("role: " +  localStorage.getItem('role'))
   }

   getLoginService() {
      return this.loginService;
   }

   isLogged() {
     return localStorage.getItem('role') != '';
   }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    protected readonly localStorage = localStorage;
}
