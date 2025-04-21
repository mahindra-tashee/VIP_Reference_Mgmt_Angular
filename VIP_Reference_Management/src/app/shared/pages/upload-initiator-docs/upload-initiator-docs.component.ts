import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-initiator-docs',
  standalone: false,
  templateUrl: './upload-initiator-docs.component.html',
  styleUrl: './upload-initiator-docs.component.css'
})
export class UploadInitiatorDocsComponent {
  uploadReferenceDocs!:FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: FormGroup){
    this.uploadReferenceDocs = data;
  }


  onFileSelect(event: any) {
    const file = event.target.files[0];
    this.uploadReferenceDocs.get('file')?.setValue(file);
  }

}
