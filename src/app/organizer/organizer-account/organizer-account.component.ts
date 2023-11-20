import {Component, OnInit} from '@angular/core';
import {ItemInsideList, JobFair, OrganizerAccount} from "../../types";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-organizer-account',
  templateUrl: './organizer-account.component.html',
  styleUrls: ['./organizer-account.component.scss']
})
export class OrganizerAccountComponent implements OnInit{

  loading: boolean = true;

  organizerAccount: OrganizerAccount = {
    id: 0,
    name: "",
    contactEmail: "",
    telephone: "",
    description: "",
  }
  jobFairs: JobFair[] = []
  jobFairsAsList: ItemInsideList[] = []


  tabs: [key: string, value: boolean][] = [
    ["tab1", true],
    ["tab2", false],
    ["tab3", false]
  ]

  changeTab(tab: string) {
    this.tabs.map((elem) => {
      if (elem[0] === tab) {
        elem[1] = true;
      }else{
        elem[1] = false;
      }
    })
  }

  foundValueByNameInTab(tab: string): boolean{
    return this.tabs.filter((elem) => elem[0] === tab)[0][1];
  }
  convertjobfairsToListType(){
    this.jobFairs.forEach(jobfair => {
      let offerAsList: ItemInsideList = {
        route: "/organizer/jobfair/" + jobfair.id,
        image: "../assets/calendar.png",
        name: jobfair.name,
        id: jobfair.id,
        description: `${jobfair.address}, ${jobfair.dateStart}-${jobfair.dateEnd} \n ${jobfair.organizerId} `,
        useFavorite: false,
        isFavorite: false,
      }
      this.jobFairsAsList.push(offerAsList);
    })
  }
  constructor( private route: ActivatedRoute) {

  }

  printId(id: string | number){
    console.log(id);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.loading = false;
      this.convertjobfairsToListType();
    });
  }
}
