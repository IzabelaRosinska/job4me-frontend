import {Component, OnInit} from '@angular/core';
import {JobFair, Page} from "../../types";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {JobfairService} from "../services/jobfair.service";

@Component({
  selector: 'app-jobfair',
  templateUrl: './jobfair.component.html',
  styleUrls: ['./jobfair.component.scss']
})
export class JobfairComponent implements OnInit{

  jobFairsState$!: Observable<{ appState: string, appData?: Page<JobFair>, error?: HttpErrorResponse }>;
  responseSubject = new BehaviorSubject<Page<JobFair>>({} as Page<JobFair>);
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();


  constructor(private route: ActivatedRoute,
              private serviceJobFair: JobfairService) {}

  pageSize: number = 5;
  pageIndex: number = 0;
  length: number = 20;

  loading: boolean = true;

  jobFair: JobFair = {
    id: 0,
    name: "",
    organizerId: 0,
    dateStart: "",
    dateEnd: "",
    address: "",
    description: "",
    displayDescription: ""
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      const jobfairId = Number(params.get('jobfair-id'));
      if(jobfairId){
        this.serviceJobFair.getJobFairById(jobfairId).subscribe((response: JobFair) => {
            this.jobFair.id = response.id;
            this.jobFair.name = response.name;
            this.jobFair.organizerId = response.organizerId;
            this.jobFair.dateStart = response.dateStart.toString();
            this.jobFair.dateEnd = response.dateEnd.toString();
            this.jobFair.address = response.address;
            this.jobFair.description = response.description;
            this.jobFair.displayDescription = response.displayDescription;
            this.loading = false;
        });
      }
      else{
        this.loading = false;
      }
    });
  }

  convertDate(date: string): string{
    return date.substring(0,10)+" "+date.substring(14,19);
  }

  convertToLocalDateTime(javaDateTimeString: string): Date {
    const [datePart, timePart] = javaDateTimeString.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hour, minute, second] = timePart.split(':').map(Number);
    const milliseconds = Number(timePart.split('.')[1]);

    return new Date(year, month - 1, day, hour, minute, second, milliseconds);
  }

}
