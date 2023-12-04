import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login-redirect',
  templateUrl: './login-redirect.component.html',
  styleUrls: ['./login-redirect.component.scss']
})
export class LoginRedirectComponent implements OnInit
{

  constructor(private route: ActivatedRoute,
              private router: Router) {
    console.log('LoginRedirectComponent');
  }

  user: string | null = null;
  token: string | null = null;
  role: string | null = null;

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.token = params.get('token');
      this.role = params.get('role');

      if(this.token && this.role){
        this.role = this.role.toLowerCase().replace('_enabled', '').replace('role_', '');
        console.log(this.role);
        localStorage.setItem('token', this.token);
        localStorage.setItem('role', this.role);
      }
      console.log('/' + this.role + '/account')

      this.router.navigate(['/' + this.role + '/account']);
    });
  }

}
