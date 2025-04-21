import { Component, inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { VipReference } from '../dashboard/dashboard.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
const ELEMENT_DATA: VipReference[] = [
  {
    referenceNo: 'VIP12347',
    subject: 'Water Pipeline Maintenance',
    receivedDate: new Date('2025-04-03'),
    priority: 'Low',
    currentQueue: 'VIP_Initiator',
    status: 'Initiated'
  },
  {
    referenceNo: 'VIP12348',
    subject: 'Electricity Complaint',
    receivedDate: new Date('2025-03-30'),
    priority: 'High',
    currentQueue: 'VIP_Initiator',
    status: 'Assigned'
  },
  {
    referenceNo: 'VIP12350',
    subject: 'Street Light Repair',
    receivedDate: new Date('2025-04-02'),
    priority: 'Low',
    currentQueue: 'VIP_Initiator',
    status: 'Completed'
  },
  {
    referenceNo: 'VIP12352',
    subject: 'Public Park Renovation',
    receivedDate: new Date('2025-04-04'),
    priority: 'Normal',
    currentQueue: 'VIP_Initiator',
    status: 'In Progress'
  },
  {
    referenceNo: 'VIP12353',
    subject: 'Traffic Signal Installation',
    receivedDate: new Date('2025-03-31'),
    priority: 'High',
    currentQueue: 'VIP_Initiator',
    status: 'Initiated'
  },
  {
    referenceNo: 'VIP12354',
    subject: 'Drainage System Cleaning',
    receivedDate: new Date('2025-04-07'),
    priority: 'Low',
    currentQueue: 'VIP_Initiator',
    status: 'Completed'
  }
]

@Component({
  selector: 'app-vip-initiator',
  standalone: false,
  templateUrl: './vip-initiator.component.html',
  styleUrl: './vip-initiator.component.css'
})
export class VipInitiatorComponent {

  private router=inject(Router);
  
  displayedColumns: string[] = [
    'referenceNo',
    'subject',
    'receivedDate',
    'priority',
    'currentQueue',
    'actions'
  ];
  dataSource = new MatTableDataSource<VipReference>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit() {
    setTimeout(()=>{
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },500)
  }

  viewReference(ref: VipReference) {
    // Placeholder for view logic, e.g. routing or dialog
    alert(`Viewing reference: ${ref.referenceNo}`);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addVipReference(){
    this.router.navigate(['/dashboard/add-reference'])
  }
}
