import { Component } from '@angular/core';
import {EmployerAccount} from "../../../types";
import {
  SimpleTrueFalsePopUpComponent
} from "../../../utilities/pop-up/simple-true-false-pop-up/simple-true-false-pop-up.component";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../../../worker/service/employee.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-employer-info-form',
  templateUrl: './employer-info-form.component.html',
  styleUrls: ['./employer-info-form.component.scss']
})
export class EmployerInfoFormComponent {


    selectedFile: File | null = null;
    imageData: string | null = null;
    MAX_FILE_SIZE = 25000;


    constructor(public  dialog: MatDialog,
              private router: Router,
              private service: EmployeeService,
              private route: ActivatedRoute,
              private http: HttpClient) { }


  employerAccountInfo: EmployerAccount = {
    id: "000001",
    companyName: "Google",
    email: "gooooogle@gmail.com",
    telephone: "111333999",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis euismod dolor est, non mattis nibh convallis ac. Aliquam a laoreet" +
        " turpis. Ut dictum elementum tincidunt. Nam quis nulla porttitor lacus imperdiet rhoncus ac vitae urna. Quisque id sem nec ipsum maximus " +
        "volutpat sit amet sit amet quam. Vestibulum tincidunt feugiat odio in finibus. Phasellus convallis dolor nulla, vel finibus felis aliquet a. " +
        "Donec eu metus id ante venenatis fermentum vitae sed massa. Etiam lectus eros, condimentum eget nulla et, interdum dapibus quam. Ut egestas " +
        "ipsum at enim porttitor bibendum. Quisque eu fermentum lacus. Integer fermentum erat enim, eget tincidunt libero rhoncus nec. Aliquam pulvinar " +
        "lectus eget massa placerat, eget ornare velit dapibus." + "Sed vehicula porttitor ligula, vitae auctor arcu iaculis id. Mauris id mauris sapien. " +
        "Aenean lacinia lacus ac augue ultrices, eget viverra odio vehicula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere " +
        "cubilia curae; Maecenas porta ",
      displayDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt velit ut lorem lobortis cursus. In hac habitasse platea dictumst. "

  }

    onFileSelected(event: any) {
        if(event.target.files.length > 0 && event.target.files[0].type.includes("image") && event.target.files[0].size < this.MAX_FILE_SIZE){
            this.selectedFile = event.target.files[0];
            this.displaySelectedImage();
        }
    }

    displaySelectedImage() {
        if (this.selectedFile) {
            const reader = new FileReader();

            reader.onload = (e: any) => {
                this.employerAccountInfo.photo = e.target.result;
            };

            reader.readAsDataURL(this.selectedFile);
        }
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

      // add logic for saving data

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

      // add redirecting to client page
      if(result)
        this.router.navigate(['employer/account']);
    });
  }

}
