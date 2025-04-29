import { Component, inject, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { VipReference } from '../dashboard/dashboard.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { UsermgmtService } from '../../service/usermgmt.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interface/user.model';
import { MatDialog } from '@angular/material/dialog';
import { ViewReferenceComponent } from '../view-reference/view-reference.component';


@Component({
  selector: 'app-vip-initiator',
  standalone: false,
  templateUrl: './vip-initiator.component.html',
  styleUrl: './vip-initiator.component.css'
})
export class VipInitiatorComponent {
  userDetails!:User;
  @Input() selectedQueueData:string="";
  private router=inject(Router);
  private userMgmtService = inject(UsermgmtService);
  private ngxService =inject(NgxUiLoaderService);
  private toasterService=inject(ToastrService);
  private dialog=inject(MatDialog);

  displayedColumns: string[] = [
    'referenceNo',
    'subject',
    'receivedDate',
    'prirority',
    'currentQueue',
    'actions'
  ];
  queueReferencesData = new MatTableDataSource<VipReference>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.getUserDetails();
    this.getQueueReferences();
  }

  getUserDetails(){
    const userData=localStorage.getItem("user");
    if(userData){
      this.userDetails=JSON.parse(userData);
    }
  }

  getQueueReferences(){
    this.ngxService.start();
    const queueData={
      userId:this.userDetails.userId,
      queue:this.selectedQueueData
    }
    this.userMgmtService.getQueueReferencesList(queueData).subscribe({
      next:(res)=>{
         this.queueReferencesData.data=res;
         this.initiatePaginator();
      },
      error:(err)=>{
        console.log(err);
        this.ngxService.stop();
      }
    })
  }

  initiatePaginator(){
    setTimeout(()=>{
      this.queueReferencesData.paginator = this.paginator;
      this.queueReferencesData.sort = this.sort;
      this.ngxService.stop();
    },500);
  }

  addVipReference(){
    this.router.navigate(['/dashboard/add-reference'])
  }

  addSelectedReference(ref: VipReference){

  }

  viewReference(ref: VipReference) {
    this.router.navigate([`/dashboard/add-reference/${ref.referenceNo}`])
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.queueReferencesData.filter = filterValue.trim().toLowerCase();
  }
}
