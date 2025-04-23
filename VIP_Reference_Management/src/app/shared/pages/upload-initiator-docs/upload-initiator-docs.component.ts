import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-initiator-docs',
  standalone: false,
  templateUrl: './upload-initiator-docs.component.html',
  styleUrl: './upload-initiator-docs.component.css'
})
export class UploadInitiatorDocsComponent {
  uploadReferenceDocs!:FormGroup;
  selectedFile!: File;

  constructor(@Inject(MAT_DIALOG_DATA) public data: FormGroup,private dialogRef: MatDialogRef<UploadInitiatorDocsComponent>){
    this.uploadReferenceDocs = data;
  }


  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (file.type === 'application/pdf') {
        this.selectedFile = file;
      } else {
        alert('Please select a valid PDF file.');
      }
    }
  }

  confirmUpload(): void {
    if (this.selectedFile) {
      this.dialogRef.close(this.selectedFile); // 🎯 This sends file back to parent
    }
  }

}
