import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-payment-return-page',
  templateUrl: './payment-return-page.component.html',
  styleUrls: ['./payment-return-page.component.scss']
})
export class PaymentReturnPageComponent implements OnInit{

    constructor(private route: ActivatedRoute) { }

    isSuccessful: boolean = false;
    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        this.isSuccessful = params.get('result') == 'success';
      });
    }

}
