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
    dateStart: '',
    dateEnd: '',
    address: "",
    description: "",
    displayDescription: ""
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      const jobfairId = Number(params.get('jobfair-id'));
      if(jobfairId){
        this.serviceJobFair.getJobFairById(jobfairId).subscribe((response: JobFair) => {
          this.jobFair = response;
          this.jobFair.dateStart = this.convertDate(this.jobFair.dateStart);
          this.jobFair.dateEnd = this.convertDate(this.jobFair.dateEnd);
          this.loading = false;
        });
      }
      else{
        this.loading = false;
      }
    });
  }

  convertDate(date: string): string{
    return date.substring(0,10)+" "+date.substring(15);
  }

}
