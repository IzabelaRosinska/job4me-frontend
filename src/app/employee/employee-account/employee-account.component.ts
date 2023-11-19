import {Component, OnInit} from '@angular/core';
import {EmployeeAccount} from "../../types";
import {EmployeeService} from "../service/employee.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

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

    generatePdf(): void {
      this.serviceEmployee.getPdf().subscribe((response) => {
        const blob = new Blob([response.body], {type: 'application/pdf'});
        const url = window.URL.createObjectURL(blob);
        window.open(url);
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
