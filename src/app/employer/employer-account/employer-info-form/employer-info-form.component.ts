import {Component, OnInit} from '@angular/core';
import {EmployerAccount} from "../../../types";
import {
  SimpleTrueFalsePopUpComponent
} from "../../../utilities/pop-up/simple-true-false-pop-up/simple-true-false-pop-up.component";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {EmployerService} from "../../service/employer.service";
import {catchError} from "rxjs";
import {VariablesService} from "../../../utilities/service/variables.service";

@Component({
  selector: 'app-employer-info-form',
  templateUrl: './employer-info-form.component.html',
  styleUrls: ['./employer-info-form.component.scss']
})
export class EmployerInfoFormComponent implements OnInit {


  selectedFile: File | null = null;
  imageData: string | null = null;
  MAX_FILE_SIZE = 10000;
  loading: boolean = true;
  creatingEmployer: boolean = false;
  is_submit_failed = false


  constructor(public dialog: MatDialog,
              private router: Router,
              private serviceEmployer: EmployerService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.serviceEmployer.getEmployer().subscribe((response) => {
        this.employerAccount.id = response.id;
        this.employerAccount.companyName = response.companyName;
        this.employerAccount.email = response.email;
        this.employerAccount.telephone = response.telephone;
        this.employerAccount.description = response.description;
        this.employerAccount.displayDescription = response.displayDescription;
        this.employerAccount.photo = response.photo;
        this.employerAccount.address = response.address;
        this.loading = false;

        if(!this.employerAccount.companyName || !this.employerAccount.email || !this.employerAccount.telephone || !this.employerAccount.description || !this.employerAccount.displayDescription){
          this.creatingEmployer = true;
        }
      });
    });
  }

  employerAccount: EmployerAccount = {
    id: 0,
    companyName: "",
    email: "",
    telephone: "",
    description: "",
    displayDescription: "",
    photo: "",
    address: ""
  }

  onFileSelected(event: any) {
    if (event.target.files.length <= 0) return;
    if (!event.target.files[0].type.includes("image")) {
      const dialogRef = this.dialog.open(SimpleTrueFalsePopUpComponent, {
        data:
          {
            title: "Niepoprawny format",
            mainMessage: "Wybrany plik posiada zły format.\nZamieszczone zdjęcie powinno być w formacie JPG lub PNG.",
            confirmMessage: "OK",
            declineMessage: ""
          }
      });
      return;
    }
    if (event.target.files[0].size >= this.MAX_FILE_SIZE) {
      const dialogRef = this.dialog.open(SimpleTrueFalsePopUpComponent, {
        data:
          {
            title: "Przekroczono rozmiar",
            mainMessage: "Wybrano plik przekraczający maksymalny dopuszczony rozmiar.\nPlik powinien być niewiększy niż " + this.MAX_FILE_SIZE / 1000 + "kb.",
            confirmMessage: "OK",
            declineMessage: ""
          }
      });
      return;
    }
    this.selectedFile = event.target.files[0];
    this.displaySelectedImage();
  }

  displaySelectedImage() {
    if (this.selectedFile) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.employerAccount.photo = e.target.result;
      };

      reader.readAsDataURL(this.selectedFile);
    }
  }

  removeFile() {
    this.selectedFile = null;
    this.employerAccount.photo = undefined;
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
        this.loading = true;
        this.selectedFile = null;
        this.serviceEmployer.postEmployer(this.employerAccount).pipe(
          catchError((err) => {
            this.loading = false;
            return [];
          })
        ).subscribe((response) => {
          this.router.navigate(['employer/account']);
          this.loading = false;
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

      if (result)
        this.router.navigate(['employer/account']);
    });
  }
}
