import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {catchError, throwError} from "rxjs";

@Component({
  selector: 'app-jobfair-edit-form',
  templateUrl: './jobfair-edit-form.component.html',
  styleUrls: ['./jobfair-edit-form.component.scss']
})
export class JobfairEditFormComponent implements OnInit{

  loading: boolean = true;


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

  constructor() {

  }

  ngOnInit(): void {
    this.loading = false;
  }


}
