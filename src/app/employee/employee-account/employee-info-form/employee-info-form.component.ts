import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {
  SimpleTrueFalsePopUpComponent
} from "../../../utilities/pop-up/simple-true-false-pop-up/simple-true-false-pop-up.component";
import {EmployeeService} from "../../service/employee.service";
import {EmployeeAccount} from "../../../types";

@Component({
  selector: 'app-info-form',
  templateUrl: './employee-info-form.component.html',
  styleUrls: ['./employee-info-form.component.scss']
})
export class EmployeeInfoFormComponent implements OnInit {


  loading: boolean = true;
  creatingEmployee: boolean = false;

  constructor(public dialog: MatDialog,
              private router: Router,
              private service: EmployeeService,
              private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.service.getEmployee().subscribe((response) => {
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
        this.loading = false;

        if(!this.employeeAccountInfo.firstName || !this.employeeAccountInfo.lastName || !this.employeeAccountInfo.email || !this.employeeAccountInfo.telephone){
          this.creatingEmployee = true;
        }
      });
    });

  }

  employeeAccountInfo: EmployeeAccount = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    telephone: "",
    aboutMe: "",
    education: [],
    experience: [],
    skills: [],
    projects: [],
    interests: "",
  }

  moduleSaveInfo(list: string[], id: string) {
    switch (id) {
      case "education":
        this.employeeAccountInfo.education = list;
        break;
      case "experience":
        this.employeeAccountInfo.experience = list;
        break;
      case "skills":
        this.employeeAccountInfo.skills = list;
        break;
      case "projects":
        this.employeeAccountInfo.projects = list;
        break;
    }
  }


  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(SimpleTrueFalsePopUpComponent, {
      data:
        {
          title: "Potwierdzenie",
          mainMessage: "Czy chcesz potwierdzić operacje?",
          confirmMessage: "Tak",
          declineMessage: "Nie"
        }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result){
        this.loading = true;
        this.service.putEmployee(this.employeeAccountInfo).subscribe((response) => {
          this.router.navigate(['employee/account']);
          this.loading = false;
        });
      }

    });
  }

  openDeclineDialog(): void {
    const dialogRef = this.dialog.open(SimpleTrueFalsePopUpComponent, {
      data:
        {
          title: "Odrzuć zmiany ",
          mainMessage: "Czy chcesz odrzucić wprowadzone zmiany?",
          confirmMessage: "Tak",
          declineMessage: "Nie"
        }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result){
        this.router.navigate(['employee/account']);
      }

    });
  }

  validList(list: string[] | undefined): string[] {
    if (list == undefined) return [];
    return list;
  }

}
