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
    id: 100,
    name: "Super jobfair Organizer",
    contactEmail: "super-jobfair-organizer@gmail.com",
    telephone: "876203723",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et " +
        "dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo " +
        "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. " +
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  }
  jobFairs: JobFair[] = [
    {id: 101,
      name: "Super jobfair",
      organizerId: this.organizerAccount.id,
      localization: "Warsaw",
      date: "2021-05-05",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et " +
          "dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo " +
          "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. " +
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {id: 102,
      name: "Super jobfair 2",
      organizerId: this.organizerAccount.id,
      localization: "Wroclaw",
      date: "2021-05-10",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et " +
          "dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo " +
          "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. " +
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {id: 103,
      name: "Super jobfair 3",
      organizerId: this.organizerAccount.id,
      localization: "Krakow",
      date: "2021-05-15",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et " +
          "dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo " +
          "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. " +
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {id: 104,
      name: "Super jobfair 3",
      organizerId: this.organizerAccount.id,
      localization: "Krakow",
      date: "2021-05-15",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et " +
          "dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo " +
          "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. " +
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ]
  jobFairsAsList: ItemInsideList[] = []


  convertjobfairsToListType(){
    this.jobFairs.forEach(jobfair => {
      let offerAsList: ItemInsideList = {
        route: "/organizer/jobfair/" + jobfair.id,
        image: "../assets/calendar.png",
        name: jobfair.name,
        id: jobfair.id,
        description: `${jobfair.localization}, ${jobfair.date} \n ${jobfair.organizerId} `,
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
