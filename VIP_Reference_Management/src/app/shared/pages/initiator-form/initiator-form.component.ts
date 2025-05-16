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
import { ActivatedRoute } from '@angular/router';
import { VipReferenceDetailsResponse } from '../../interface/reference-details-response.model';

import { EditorComponent } from '@tinymce/tinymce-angular';
import { ReplyEditorComponent } from '../reply-editor/reply-editor.component';

@Component({
  selector: 'app-initiator-form',
  standalone: false,
  templateUrl: './initiator-form.component.html',
  styleUrl: './initiator-form.component.css'
})
export class InitiatorFormComponent {
  showReferencNo: boolean = false;
  userDetails!: User;
  public ScrollModeType = ScrollModeType;
  public scrollMode: ScrollModeType = ScrollModeType.vertical;
  pdfSrc: string | ArrayBuffer | undefined;
  private dialog = inject(MatDialog);
  private userMgmtService = inject(UsermgmtService);
  private ngxService = inject(NgxUiLoaderService);
  private toastr = inject(ToastrService);
  private activateRoute = inject(ActivatedRoute);
  addVipReferenceDetails!: FormGroup;
  forwardReferenceForm!: FormGroup;
  referenceNo!: string | null;
  refernceDetails: VipReferenceDetailsResponse = {} as VipReferenceDetailsResponse;
  init: EditorComponent['init'] = {
    plugins: 'lists link image table code help wordcount'
  };

  ngOnInit() {
    this.getUserDetails();
    this.initiateReferenceForm();
    this.disabledReferenceField();
    this.referenceNo = this.activateRoute.snapshot.paramMap.get('referenceNo');
    if (this.referenceNo !== null && this.referenceNo !== undefined) {
      this.getReferenceDetails(this.referenceNo)
    }
  }

  disabledReferenceField() {
    if (this.userDetails.roles[0].roleName == "VIP_Initiator") {
      this.showReferencNo = false;
      const todayDate = new Date();
      this.addVipReferenceDetails.patchValue({
        dateOfEntry: new Date()
      });
      this.addVipReferenceDetails.get('referenceNo')?.disable();
      this.addVipReferenceDetails.get('dateOfEntry')?.disable();
    }
    else if (this.userDetails.roles[0].roleName == "VIP_Assigner") {
      this.initiateforwardReferenceForm();
      this.showReferencNo = true;
      this.addVipReferenceDetails.get('referenceNo')?.disable();
      this.addVipReferenceDetails.get('dateOfLetter')?.disable();
      this.addVipReferenceDetails.get('dateOfReceiving')?.disable();
      this.addVipReferenceDetails.get('dateOfEntry')?.disable();
      this.addVipReferenceDetails.get('state')?.disable();
    }
  }

  getUserDetails() {
    const userData = localStorage.getItem("user");
    if (userData) {
      this.userDetails = JSON.parse(userData);
    }
  }

  initiateReferenceForm() {
    this.addVipReferenceDetails = new FormGroup({
      "referenceNo": new FormControl(""),
      "dateOfLetter": new FormControl("", Validators.required),
      "dateOfReceiving": new FormControl("", Validators.required),
      "dateOfEntry": new FormControl("", Validators.required),
      "nameOfDiginitary": new FormControl("", Validators.required),
      "emailId": new FormControl("", Validators.required),
      "designation": new FormControl("", Validators.required),
      "state": new FormControl("", Validators.required),
      "constituency": new FormControl("", Validators.required),
      "prirority": new FormControl("", Validators.required),
      "catgOfSubject": new FormControl("", Validators.required),
      "subCatgOfSubject": new FormControl("", Validators.required),
      "subjectOrIssue": new FormControl("", Validators.required),
      "upload": new FormGroup({
        "file": new FormControl("", Validators.required),
        "documentType": new FormControl(""),
        "comments": new FormControl("")
      })
    })
  }

  initiateforwardReferenceForm() {
    this.forwardReferenceForm = new FormGroup({
      "routingType": new FormControl(""),
      "actionType": new FormControl(""),
      "action": new FormControl(""),
      "replyType": new FormControl(""),
      "organization": new FormControl(""),
      "officeType": new FormControl(""),
      "office": new FormControl(""),
      "userDesignation": new FormControl(""),
      "userName": new FormControl(""),
      "forwardComment": new FormControl("")
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(UploadInitiatorDocsComponent, {
      data: this.addVipReferenceDetails.get('upload') as FormGroup
    });

    dialogRef.afterClosed().subscribe((formGroupDts) => {
      const uploadGroup = this.addVipReferenceDetails.get('upload') as FormGroup;
      uploadGroup.get('file')?.setValue(formGroupDts.selectFile);
      uploadGroup.get('comments')?.setValue(formGroupDts.comments);
      uploadGroup.get('documentType')?.setValue(formGroupDts.documentType);

      if (formGroupDts.selectFile) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result !== null) {
            this.pdfSrc = reader.result;

          }
        };
        reader.readAsArrayBuffer(formGroupDts.selectFile);
      }
    });
  }

  addVipReferencDetails() {
    this.ngxService.start();
    if (this.addVipReferenceDetails.invalid) {
      this.addVipReferenceDetails.markAllAsTouched(); // force show errors
      return;
    }
    const formData = new FormData();

    // Append normal fields
    formData.append("fromUserId", JSON.stringify(this.userDetails.userId));
    formData.append("toUserId", "2");
    formData.append("fromRoleId", JSON.stringify(this.userDetails.roles[0].roleId));
    formData.append("toRoleId", "2");
    formData.append("dateOfLetter", this.formatDateToIso(this.addVipReferenceDetails.get("dateOfLetter")?.value));
    formData.append("dateOfReceiving", this.formatDateToIso(this.addVipReferenceDetails.get("dateOfReceiving")?.value));
    formData.append("dateOfEntry", this.formatDateToIso(this.addVipReferenceDetails.get("dateOfEntry")?.value));
    formData.append("nameOfDignitary", this.addVipReferenceDetails.get("nameOfDiginitary")?.value);
    formData.append("emailId", this.addVipReferenceDetails.get("emailId")?.value);
    formData.append("designation", this.addVipReferenceDetails.get("designation")?.value);
    formData.append("state", this.addVipReferenceDetails.get("state")?.value);
    formData.append("constituency", this.addVipReferenceDetails.get("constituency")?.value);
    formData.append("prirority", this.addVipReferenceDetails.get("prirority")?.value);
    formData.append("categoryOfSubject", this.addVipReferenceDetails.get("catgOfSubject")?.value);
    formData.append("subCategoryOfSubject", this.addVipReferenceDetails.get("subCatgOfSubject")?.value);
    formData.append("subject", this.addVipReferenceDetails.get("subjectOrIssue")?.value);

    // Append uploaded file
    const uploadGroup = this.addVipReferenceDetails.get('upload') as FormGroup;
    const file = uploadGroup.get('file')?.value;
    const documentType = uploadGroup.get('documentType')?.value;
    const comments = uploadGroup.get('comments')?.value;

    if (file) {
      formData.append("files", file); // Backend expects 'files' list
      formData.append("documentTypes", documentType);
      formData.append("comments", comments);
    }

    this.userMgmtService.addVipReferenceDetails(formData).subscribe({
      next: (res) => {
        this.toastr.success("Reference added successfully");
        this.resetAddReferenceForm()
        this.ngxService.stop();
      },
      error: (err) => {
        this.toastr.error("please enter valid details");
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

  resetAddReferenceForm() {
    this.addVipReferenceDetails.reset();
    this.pdfSrc = "";
  }


  getReferenceDetails(referenceNo: string) {
    this.ngxService.start();
    this.userMgmtService.getReferenceDetails(referenceNo).subscribe({
      next: (res: VipReferenceDetailsResponse) => {
        this.refernceDetails = res;
        console.log(res)
        this.setReferenceDetails();
        this.ngxService.stop();
      },
      error: (err) => {
        this.toastr.error("Error in getting reference details");
        this.ngxService.stop();
      }
    })
  }

  setReferenceDetails() {
    this.addVipReferenceDetails.patchValue({
      referenceNo: this.refernceDetails.referenceNo,
      dateOfLetter: this.refernceDetails.dateOfLetter,
      dateOfReceiving: this.refernceDetails.receivedDate,
      dateOfEntry: this.refernceDetails.dateOfEntry,
      nameOfDiginitary: this.refernceDetails.nameOfDignitary,
      emailId: this.refernceDetails.emailId,
      designation: this.refernceDetails.designation,
      state: this.refernceDetails.state,
      constituency: this.refernceDetails.constituency,
      prirority: this.refernceDetails.prirority,
      catgOfSubject: this.refernceDetails.categoryOfSubject,
      subCatgOfSubject: this.refernceDetails.subCategoryOfSubject,
      subjectOrIssue: this.refernceDetails.subject,
    });

    // Populate the file and document details
    if (this.refernceDetails.documents && this.refernceDetails.documents.length > 0) {
      // this.addVipReferenceDetails.get('upload')?.patchValue({
      //   file: this.refernceDetails.documents[0].fileName, // Assuming you're uploading only one file
      //   documentType: this.refernceDetails.documents[0].documentType,
      //   comments: this.refernceDetails.documents[0].comments
      // });

      if (this.refernceDetails.documents[0].fileName) {
        console.log('assets/pdf' + this.refernceDetails.documents[0].fileName)
        this.pdfSrc = 'assets/pdf' + this.refernceDetails.documents[0].fileName;
        console.log(this.pdfSrc)
      }
    }
  }

  uploadReply() {

  }

  openEditor() {
    const dialogRef = this.dialog.open(ReplyEditorComponent);
  }
}
