import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {catchError, throwError} from "rxjs";
import {
  SimpleTrueFalsePopUpComponent
} from "../../../utilities/pop-up/simple-true-false-pop-up/simple-true-false-pop-up.component";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {OrganizerService} from "../../service/organizer.service";
import {JobfairService} from "../../services/jobfair.service";

@Component({
  selector: 'app-jobfair-edit-form',
  templateUrl: './jobfair-edit-form.component.html',
  styleUrls: ['./jobfair-edit-form.component.scss']
})
export class JobfairEditFormComponent implements OnInit{

  loading: boolean = true;
  selectedDateTime: Date = new Date();
  firstTime: boolean = false;

  jobFair = {
    id: 0,
    name: "",
    organizerId: 0,
    dateStart: '',
    dateEnd: '',
    address: "",
    description: "",
    displayDescription: ""
  }


  subbmitForm(jobfairForm: NgForm) {

  }

  constructor(public dialog: MatDialog,
              private router: Router,
              private serviceJobfair: JobfairService,
              private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const jobfairId =  params.get('jobfair-id');
      if(jobfairId){
         this.serviceJobfair.getJobFairById(parseInt(jobfairId)).subscribe((response) => {
            this.jobFair.id = response.id;
            this.jobFair.name = response.name;
            this.jobFair.organizerId = response.organizerId;
            this.jobFair.dateStart = response.dateStart;
            this.jobFair.dateEnd = response.dateEnd;
            this.jobFair.address = response.address;
            this.jobFair.description = response.description;
            this.jobFair.displayDescription = response.displayDescription;
            console.log(new Date())
        });
      }else{
        this.firstTime = true;
      }

    });
    this.loading = false;
  }

  convertToLocalDateTime(javaDateTime: any): Date {
    const year = javaDateTime.year();
    const month = javaDateTime.monthValue() - 1; // Java months are 1-based, while JavaScript months are 0-based
    const day = javaDateTime.dayOfMonth();
    const hour = javaDateTime.hour();
    const minute = javaDateTime.minute();
    const second = javaDateTime.second();

    return new Date(year, month, day, hour, minute, second);
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
      const role = localStorage.getItem('role');
      if (result && role) {
        this.serviceJobfair.postJobFair(this.jobFair).pipe(
          catchError((err) => {
            return [];
          })
        ).subscribe((response) => {
          if(role == 'organizer'){
            this.router.navigate(['organizer/job-fair/'+this.jobFair.id]);
          }else{
            this.router.navigate([role+'/organizer/job-fair/'+this.jobFair.id]);
          }
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
      const role = localStorage.getItem('role');
      if (result){
        if(role == 'organizer'){
          this.router.navigate(['organizer/job-fair/'+this.jobFair.id]);
        }else{
          this.router.navigate([role+'/organizer/job-fair/'+this.jobFair.id]);
        }
      }

    });
  }


}
