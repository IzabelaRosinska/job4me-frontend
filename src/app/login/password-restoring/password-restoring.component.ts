import {Component, Input, OnInit} from '@angular/core';
import {PasswordChange, RegisterData} from "../../types";
import {NgForm} from "@angular/forms";
import {LoginService} from "../service/login.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-password-restoring',
    templateUrl: './password-restoring.component.html',
    styleUrls: ['./password-restoring.component.scss']
})
export class PasswordRestoringComponent implements OnInit {

    passwordVisible: string = 'password';
    visibilityIconClass: string = 'fa fa-eye-slash';

    matchingPasswordVisible: string = 'password';
    visibilityMaatchingPassowrdIconClass: string = 'fa fa-eye-slash';

    loading: boolean = true;
    emailData: string = '';
    isEmailSend: boolean = false;

    @Input() mode: string = 'email'

    constructor(private loginService: LoginService,
                private router: Router,
                public route: ActivatedRoute) {
    }

    passwordsData: PasswordChange = {
        password: '',
        matchingPassword: '',
        token: ''
    }

    ngOnInit(): void {
        this.loading = false;
        this.mode = this.route.snapshot.data['mode'];

        this.route.url.subscribe(

        )
        this.route.queryParamMap.subscribe((params) => {
            this.passwordsData.token = params.get('token') || undefined;
        });
    }


    sendEmail(form: NgForm) {
        this.isEmailSend = true;
        this.loading = true;
        this.loginService.startChangingPassword(this.emailData).subscribe((response) => {
        })
    }


    changePassword(form: NgForm) {

        this.loading = true;
        this.loginService.updatePassword(this.passwordsData).subscribe((response) => {
            switch (response.status) {
                case 200:
                    localStorage.removeItem('token');
                    localStorage.removeItem('role');
                    this.router.navigate(['/login']);
                    this.loading = false;
                    break;
                case 500:
                    form.resetForm({
                        password: '',
                        matchingPassword: ''
                    });

                    this.loading = false;
                    break;
            }
        })
    }

    togglePassowrdVisibility(isMatchingPassword: boolean) {
        if (isMatchingPassword) {
            if (this.matchingPasswordVisible == 'password') {
                this.matchingPasswordVisible = 'text';
                this.visibilityMaatchingPassowrdIconClass = 'fa fa-eye';
            } else {
                this.matchingPasswordVisible = 'password';
                this.visibilityMaatchingPassowrdIconClass = 'fa fa-eye-slash';
            }
            return;
        } else {
            if (this.passwordVisible == 'password') {
                this.passwordVisible = 'text';
                this.visibilityIconClass = 'fa fa-eye';
            } else {
                this.passwordVisible = 'password';
                this.visibilityIconClass = 'fa fa-eye-slash';
            }
        }
    }


}
