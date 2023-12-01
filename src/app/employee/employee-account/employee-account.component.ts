import {Component, OnInit} from '@angular/core';
import {EmployeeAccount, PdfDto} from "../../types";
import {EmployeeService} from "../service/employee.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

@Component({
    selector: 'app-employee-account',
    templateUrl: './employee-account.component.html',
    styleUrls: ['./employee-account.component.scss']
})
export class EmployeeAccountComponent implements OnInit {

    loading: boolean = true;
    isOwner: boolean = false;

    constructor(private serviceEmployee: EmployeeService,
                private route: ActivatedRoute,
                private router:  Router) {}

    ngOnInit(): void {
      this.route.paramMap.subscribe((params: ParamMap) => {
        const role = localStorage.getItem('role');
        const id = params.get('employee-id');
        if (id && role) {
          this.serviceEmployee.getEmployeeById(id, role).subscribe((response) => {
            this.employeeAccountInfo = response;
            this.loading = false;
          });
        } else {
          this.serviceEmployee.getEmployee().subscribe((response) => {
            this.employeeAccountInfo = response;

            if(!this.employeeAccountInfo.firstName || !this.employeeAccountInfo.lastName || !this.employeeAccountInfo.email){
              this.router.navigate(['employee/editInfo']);
            }
            this.loading = false;
            this.isOwner = true;
          });
        }

      });
    }
  employeeAccountInfo: EmployeeAccount = {
    id: "",
    firstName: "",
    lastName: "",
    telephone: "",
    email: "",
    aboutMe: "",
    education: [],
    experience: [],
    skills: [],
    projects: [],
    interests: ""
  }

    generatePdf(): void {
      this.serviceEmployee.getPdf().subscribe((response) => {

        const byteCharacters = atob(response.body.serializedPdf);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
          const slice = byteCharacters.slice(offset, offset + 512);
          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      });
    }
    // generatePdf(): void {
    //   this.serviceEmployee.getPdf().subscribe((response) => {
    //
    //     console.log(response.body)
    //     const newresponse = response.body as PdfDto;
    //
    //     // in response I have byte[] from java Spring, convert to 'application/pdf'
    //
    //     // new response is pdf file in string in base64, to deserialize it we need to convert it to blo
    //
    //     //
    //     // const byteCharacters = newresponse.serializedPDF
    //     // console.log(response);
    //     // console.log(newresponse.serializedPDF);
    //     const uintArray = new Uint8Array(newresponse.serializedPdf);
    //     const byteArrays = [];
    //     const arraybuffer = newresponse.serializedPdf as ArrayBuffer;
    //     // byteArrays.push(new Uint8Array(byteCharacters));
    //     //
    //     // // for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    //     // //   const slice = byteCharacters.slice(offset, offset + 512);
    //     // //   const byteNumbers = new Array(slice.length);
    //     // //   for (let i = 0; i < slice.length; i++) {
    //     // //     byteNumbers[i] = slice.charCodeAt(i);
    //     // //   }
    //     // //   const byteArray = new Uint8Array(byteNumbers);
    //     // //   byteArrays.push(byteArray);
    //     // // }
    //     //
    //     const blob = new Blob([uintArray], { type: 'application/pdf' });
    //     const url = window.URL.createObjectURL(blob);
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.download = 'file.pdf';
    //     link.click();
    //     window.URL.revokeObjectURL(url);
    //   });
    // }


}
