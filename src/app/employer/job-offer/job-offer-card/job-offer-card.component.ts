import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-job-offer-card',
  templateUrl: './job-offer-card.component.html',
  styleUrls: ['./job-offer-card.component.scss']
})
export class JobOfferCardComponent {
  @Input() header: string = "";
  @Input() text: string = "";
  @Input() headerBGC: string = "darker";
  @Input() textBGC: string = "light";
}
