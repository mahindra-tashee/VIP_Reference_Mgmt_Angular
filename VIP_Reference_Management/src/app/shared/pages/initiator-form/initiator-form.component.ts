import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UploadInitiatorDocsComponent } from '../upload-initiator-docs/upload-initiator-docs.component';


@Component({
  selector: 'app-initiator-form',
  standalone: false,
  templateUrl: './initiator-form.component.html',
  styleUrl: './initiator-form.component.css'
})
export class InitiatorFormComponent {
  pdfSrc: string | ArrayBuffer | undefined;
  private dialog = inject(MatDialog);
  addVipReferenceDetails!:FormGroup;

  ngOnInit(){
    this.initiateReferenceForm();
  }

  initiateReferenceForm(){
    this.addVipReferenceDetails=new FormGroup({
      "referenceNo":new FormControl(""),
      "dateOfLetter":new FormControl(""),
      "dateOfReceiving":new FormControl(""),
      "dateOfEntry":new FormControl(""),
      "nameOfDiginitary":new FormControl(""),
      "emailId":new FormControl(""),
      "designation":new FormControl(""),
      "state":new FormControl(""),
      "constituency":new FormControl(""),
      "prirority":new FormControl(""),
      "catgOfSubject":new FormControl(""),
      "subCatgOfSubject":new FormControl(""),
      "subjectOrIssue":new FormControl(""),
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

}
