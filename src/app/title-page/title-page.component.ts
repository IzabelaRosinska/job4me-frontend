import { Component } from '@angular/core';
import {UtilitiesService} from "../utilities/service/utilities.service";

@Component({
  selector: 'app-title-page',
  templateUrl: './title-page.component.html',
  styleUrls: ['./title-page.component.scss']
})
export class TitlePageComponent {

  constructor(public service: UtilitiesService) { }

}
