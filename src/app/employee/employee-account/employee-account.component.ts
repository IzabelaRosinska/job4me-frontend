import {Component, OnInit} from '@angular/core';
import {EmployeeAccount} from "../../types";
import {EmployeeService} from "../service/employee.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-employee-account',
    templateUrl: './employee-account.component.html',
    styleUrls: ['./employee-account.component.scss']
})
export class EmployeeAccountComponent implements OnInit {

    loading: boolean = true;

    constructor(private serviceEmployee: EmployeeService,
                private route: ActivatedRoute,
                private router:  Router) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.serviceEmployee.getEmployee().subscribe((response) => {
                this.employeeAccountInfo.id = response.id;
                this.employeeAccountInfo.firstName = response.firstName;
                this.employeeAccountInfo.lastName = response.lastName;
                this.employeeAccountInfo.email = response.email;
                this.employeeAccountInfo.telephone = response.telephone;
                this.employeeAccountInfo.aboutMe = response.aboutMe;
                this.employeeAccountInfo.education = response.education;
                this.employeeAccountInfo.experience = response.experience;
                this.employeeAccountInfo.skills = response.skills;
                this.employeeAccountInfo.projects = response.projects;
                this.employeeAccountInfo.interests = response.interests;

                if(!this.employeeAccountInfo.firstName || !this.employeeAccountInfo.lastName || !this.employeeAccountInfo.email){
                    this.router.navigate(['employee/editInfo']);
                }
                this.loading = false;
            });
        });
    }

    employeeAccountInfo: EmployeeAccount = {
        id: "",
        firstName: "",
        lastName: "",
        telephone: "",
        email: "",
        aboutMe: "",
        education: [],
        experience: [],
        skills: [],
        projects: [],
        interests: ""
    }
}
