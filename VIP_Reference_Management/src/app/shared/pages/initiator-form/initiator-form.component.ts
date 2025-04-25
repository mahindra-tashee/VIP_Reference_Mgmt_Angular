import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UploadInitiatorDocsComponent } from '../upload-initiator-docs/upload-initiator-docs.component';
import { ScrollModeType } from 'ngx-extended-pdf-viewer';
import { UsermgmtService } from '../../service/usermgmt.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ReferenceAssignment } from '../../interface/reference-assignement.model';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interface/user.model';

@Component({
  selector: 'app-initiator-form',
  standalone: false,
  templateUrl: './initiator-form.component.html',
  styleUrl: './initiator-form.component.css'
})
export class InitiatorFormComponent {
  userDetails!:User;
  public ScrollModeType = ScrollModeType;
  public scrollMode: ScrollModeType = ScrollModeType.vertical;
  pdfSrc: string | ArrayBuffer | undefined;
  private dialog = inject(MatDialog);
  private userMgmtService=inject(UsermgmtService);
  private ngxService=inject(NgxUiLoaderService);
  private toastr=inject(ToastrService);
  addVipReferenceDetails!:FormGroup;

  ngOnInit(){
    this.getUserDetails();
    this.initiateReferenceForm();
  }

  getUserDetails(){
    const userData=localStorage.getItem("user");
    if(userData){
      this.userDetails=JSON.parse(userData);
    }
  }

  initiateReferenceForm(){
    this.addVipReferenceDetails=new FormGroup({
      "referenceNo":new FormControl(""),
      "dateOfLetter":new FormControl("",Validators.required),
      "dateOfReceiving":new FormControl("",Validators.required),
      "dateOfEntry":new FormControl("",Validators.required),
      "nameOfDiginitary":new FormControl("",Validators.required),
      "emailId":new FormControl("",Validators.required),
      "designation":new FormControl("",Validators.required),
      "state":new FormControl("",Validators.required),
      "constituency":new FormControl("",Validators.required),
      "prirority":new FormControl("",Validators.required),
      "catgOfSubject":new FormControl("",Validators.required),
      "subCatgOfSubject":new FormControl("",Validators.required),
      "subjectOrIssue":new FormControl("",Validators.required),
      "upload": new FormGroup({
        "file": new FormControl(null),
        "documentType": new FormControl(),
        "comments":new FormControl()
      })
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(UploadInitiatorDocsComponent, {
      data: this.addVipReferenceDetails.get('upload') as FormGroup
    });
  
    dialogRef.afterClosed().subscribe((file: File | undefined) => {
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result !== null) {
            this.pdfSrc = reader.result;
          }
        };
        reader.readAsArrayBuffer(file);
      }
    });
  }

  addVipReferencDetails(){
    this.ngxService.start();
    if (this.addVipReferenceDetails.invalid) {
      this.addVipReferenceDetails.markAllAsTouched(); // force show errors
      return;
    }
    const vipReferenceDetails:ReferenceAssignment={
      "fromUserId": this.userDetails.userId,
      "toUserId": 2,
      "fromRoleId": this.userDetails.roles[0].roleId,
      "toRoleId": 2,
      "dateOfLetter": this.formatDateToIso(this.addVipReferenceDetails.get("dateOfLetter")?.value), // ISO date string format e.g., "2025-04-22T00:00:00"
      "dateOfReceiving": this.formatDateToIso(this.addVipReferenceDetails.get("dateOfReceiving")?.value),
      "dateOfEntry": this.formatDateToIso(this.addVipReferenceDetails.get("dateOfEntry")?.value),
      "nameOfDignitary": this.addVipReferenceDetails.get("nameOfDiginitary")?.value,
      "emailId": this.addVipReferenceDetails.get("emailId")?.value,
      "designation": this.addVipReferenceDetails.get("designation")?.value,
      "state": this.addVipReferenceDetails.get("state")?.value,
      "constituency": this.addVipReferenceDetails.get("constituency")?.value,
      "prirority": this.addVipReferenceDetails.get("prirority")?.value,
      "categoryOfSubject": this.addVipReferenceDetails.get("catgOfSubject")?.value,
      "subCategoryOfSubject": this.addVipReferenceDetails.get("subCatgOfSubject")?.value,
      "subject": this.addVipReferenceDetails.get("subjectOrIssue")?.value
    }


    this.userMgmtService.addVipReferenceDetails(vipReferenceDetails).subscribe({
      next:(res)=>{
        this.toastr.success("Reference added successfully");
        this.addVipReferenceDetails.reset();
        this.ngxService.stop();
      },
      error:(err)=>{
        this.toastr.error("No references found for this user");
        this.ngxService.stop();
      }
    })
  }

  formatDateToIso(date: any): string {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
      console.error('Invalid date:', date);
      return '';
    }
    // Get YYYY-MM-DD and add fixed time
    return d.toISOString().split('T')[0] + 'T00:00:00';
  }
}
