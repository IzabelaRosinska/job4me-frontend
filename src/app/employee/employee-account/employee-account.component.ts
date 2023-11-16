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
    isOwner: boolean = false;

    constructor(private serviceEmployee: EmployeeService,
                private route: ActivatedRoute,
                private router:  Router) {}

    ngOnInit(): void {
      this.route.paramMap.subscribe((params: ParamMap) => {
        const role = localStorage.getItem('role');
        const id = params.get('employee-id');
        if (id && role) {
          this.serviceEmployee.getEmployeeById(id, role).subscribe((response) => {
            this.employeeAccountInfo = response;
            this.loading = false;
          });
        } else {
          this.serviceEmployee.getEmployee().subscribe((response) => {
            this.employeeAccountInfo = response;

            if(!this.employeeAccountInfo.firstName || !this.employeeAccountInfo.lastName || !this.employeeAccountInfo.email){
              this.router.navigate(['employee/editInfo']);
            }
            this.loading = false;
            this.isOwner = true;
          });
        }

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
