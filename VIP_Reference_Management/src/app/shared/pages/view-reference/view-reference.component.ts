import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-reference',
  standalone: false,
  templateUrl: './view-reference.component.html',
  styleUrl: './view-reference.component.css'
})
export class ViewReferenceComponent {
  viewReference!:FormGroup;
  referenceDetails:any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any){
    this.referenceDetails=data;
  }

  ngOnInit(){
    this.viewReference=new FormGroup({
    "referenceNo":new FormControl(),
    "subject":new FormControl(),
    "receivedDate":new FormControl(),
    "prirority":new FormControl(),
    "currentQueue":new FormControl(),
    "status":new FormControl(),
    "actions":new FormControl()
    })
    this.setFormData();
  }

  setFormData(){
    this.viewReference.get('referenceNo')?.setValue(this.referenceDetails.referenceNo);
    this.viewReference.get('referenceNo')?.disable()
    this.viewReference.get('subject')?.setValue(this.referenceDetails.subject)
    this.viewReference.get('subject')?.disable()
    this.viewReference.get('receivedDate')?.setValue(this.referenceDetails.receivedDate)
    this.viewReference.get('receivedDate')?.disable()
    this.viewReference.get('prirority')?.setValue(this.referenceDetails.prirority)
    this.viewReference.get('prirority')?.disable()
    this.viewReference.get('currentQueue')?.setValue(this.referenceDetails.currentQueue)
    this.viewReference.get('currentQueue')?.disable()
    this.viewReference.get('status')?.setValue(this.referenceDetails.status)
    this.viewReference.get('status')?.disable()
  }
}
