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
  }

  user: string | null = null;
  token: string | null = null;
  role: string | null = null;

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.user = params.get('user');
      this.token = params.get('token');
      this.role = params.get('role');

      if(this.user && this.token && this.role){
        localStorage.setItem('user', this.user);
        localStorage.setItem('token', this.token);
        localStorage.setItem('role', this.role.toLowerCase().replace('_enabled', ''));
      }
      this.router.navigate(['/' + this.role + '/account']);
    });
  }

}
