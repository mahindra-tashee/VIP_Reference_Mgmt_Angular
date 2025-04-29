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
  uploadReferenceDocs!: FormGroup;
  selectedFile!: File;

  constructor(@Inject(MAT_DIALOG_DATA) public data: FormGroup, private dialogRef: MatDialogRef<UploadInitiatorDocsComponent>) {
    this.uploadReferenceDocs = data;
  }


  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Validate type
      if (file.type !== 'application/pdf') {
        this.uploadReferenceDocs.get('file')?.setErrors({ invalidType: true });
        return;
      }

      // Validate size (max 50MB = 50 * 1024 * 1024)
      if (file.size > 2 * 1024 * 1024) {
        this.uploadReferenceDocs.get('file')?.setErrors({ maxSizeExceeded: true });
        return;
      }

      this.uploadReferenceDocs.get('file')?.setErrors(null);
      this.selectedFile = file;
    }
  }

  confirmUpload(): void {
    if (this.selectedFile) {
      this.dialogRef.close({
        selectFile: this.selectedFile,
        documentType: this.uploadReferenceDocs.get('documentType')?.value,
        comments: this.uploadReferenceDocs.get('comments')?.value
      });
      this.uploadReferenceDocs.reset();
    }
  }

}
