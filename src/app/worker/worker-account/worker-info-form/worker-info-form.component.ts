import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {
    SimpleTrueFalsePopUpComponent
} from "../../../utilities/pop-up/simple-true-false-pop-up/simple-true-false-pop-up.component";
import {EmployeeService} from "../../service/employee.service";
import {WorkerAccount} from "../../../types";

@Component({
    selector: 'app-info-form',
    templateUrl: './worker-info-form.component.html',
    styleUrls: ['./worker-info-form.component.scss']
})
export class WorkerInfoFormComponent implements OnInit {


    loading: boolean = true;

    constructor(public dialog: MatDialog,
                private router: Router,
                private service: EmployeeService,
                private route: ActivatedRoute) {
    }


    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.service.getEmployee().subscribe((response) => {
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
                this.loading = false;
                console.log(this.workerAccountInfo)
            });
        });

    }

    workerAccountInfo: WorkerAccount = {
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
                this.workerAccountInfo.education = list;
                break;
            case "experience":
                this.workerAccountInfo.experience = list;
                break;
            case "skills":
                this.workerAccountInfo.skills = list;
                break;
            case "projects":
                this.workerAccountInfo.projects = list;
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


            this.service.putEmployee(this.workerAccountInfo).subscribe((response) => {
                console.log(response.body);
                console.log(response);

                this.router.navigate(['worker/account']);
            });
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


            if (result)
                this.router.navigate(['worker/account']);
        });
    }

    validList(list: string[] | undefined): string[] {
        if (list == undefined) return [];
        return list;
    }


}
