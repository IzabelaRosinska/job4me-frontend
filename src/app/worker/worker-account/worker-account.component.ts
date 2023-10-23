import {Component, OnInit} from '@angular/core';
import {WorkerAccount} from "../../types";
import {EmployeeService} from "../service/employee.service";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-worker-account',
  templateUrl: './worker-account.component.html',
  styleUrls: ['./worker-account.component.scss']
})
export class WorkerAccountComponent implements OnInit{


  constructor(private serviceEmployee: EmployeeService, private route: ActivatedRoute) {

  }



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


      });
    });
  }

  workerAccountInfo: WorkerAccount = {
    id: "",
    firstName: "",
    lastName: "",
    telephone: "",
    email: "",
    aboutMe: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et " +
      "dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo " +
      "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. " +
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    education: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ",
      "dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo ",
      "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."],
    experience: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ",
      "dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo ",
      "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."],
    skills: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ",
      "dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo ",
      "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."],
    projects:["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ",
      "dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo ",
      "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."],
    interests: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et "+
      "dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo "+
      "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "+
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

  }
}
