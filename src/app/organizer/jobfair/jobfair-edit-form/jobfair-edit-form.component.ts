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

  selectedFile: File | null = null;
  imageData: string | null = null;
  MAX_FILE_SIZE = 10000;

  jobFair = {
    id: 0,
    name: "",
    organizerId: 0,
    dateStart: "",
    dateEnd: "",
    address: "",
    description: "",
    displayDescription: "",
    photo: "",
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
            this.jobFair.dateStart = this.convertDate(response.dateStart.toString()) ;
            this.jobFair.dateEnd = this.convertDate(response.dateEnd.toString());
            this.jobFair.address = response.address;
            this.jobFair.description = response.description;
            this.jobFair.displayDescription = response.displayDescription;
            this.jobFair.photo = response.photo? response.photo : '';
            this.loading = false;
        });
      }else{
        this.firstTime = true;
        this.loading = false;
      }

    });

  }

  convertDate(date: string): string{
    return date.substring(0,16);
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

      if (result) {
        this.serviceJobfair.putJobFair(this.jobFair).pipe(
          catchError((err) => {
            return [];
          })
        ).subscribe((response) => {
          this.router.navigate(['organizer/job-fair/'+this.jobFair.id]);
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
        this.router.navigate(['organizer/job-fair/'+this.jobFair.id]);
      }

    });
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0 && event.target.files[0].type.includes("image") && event.target.files[0].size < this.MAX_FILE_SIZE) {
      this.selectedFile = event.target.files[0];
      this.displaySelectedImage();
    }
  }

  displaySelectedImage() {
    if (this.selectedFile) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.jobFair.photo = e.target.result;
      };

      reader.readAsDataURL(this.selectedFile);
    }
  }

  removeFile() {
    this.selectedFile = null;
    this.jobFair.photo = '';
  }


  protected readonly console = console;
}