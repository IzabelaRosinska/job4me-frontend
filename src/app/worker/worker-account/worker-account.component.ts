import {Component, OnInit} from '@angular/core';
import {WorkerAccount} from "../../types";
import {EmployeeService} from "../service/employee.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-worker-account',
    templateUrl: './worker-account.component.html',
    styleUrls: ['./worker-account.component.scss']
})
export class WorkerAccountComponent implements OnInit {

    loading: boolean = true;

    constructor(private serviceEmployee: EmployeeService,
                private route: ActivatedRoute,
                private router:  Router) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.serviceEmployee.getEmployee().subscribe((response) => {
                this.workerAccountInfo.id = response.id;
                this.workerAccountInfo.firstName = response.firstName;
                this.workerAccountInfo.lastName = response.lastName;
                this.workerAccountInfo.email = response.email;
                this.workerAccountInfo.telephone = response.telephone;
                this.workerAccountInfo.aboutMe = response.aboutMe;
                this.workerAccountInfo.education = response.education;
                this.workerAccountInfo.experience = response.experience;
                this.workerAccountInfo.skills = response.skills;
                this.workerAccountInfo.projects = response.projects;
                this.workerAccountInfo.interests = response.interests;

                if(!this.workerAccountInfo.firstName || !this.workerAccountInfo.lastName || !this.workerAccountInfo.email){
                    this.router.navigate(['worker/editInfo']);
                }
                this.loading = false;
            });
        });
    }

    workerAccountInfo: WorkerAccount = {
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
