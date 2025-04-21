import { AfterViewInit, Component, ElementRef, EventEmitter, inject, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ChangeDetectorRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { User } from '../../interface/user.model';
import { Router } from '@angular/router';
Chart.register(...registerables);

export interface VipReference {
  referenceNo: string;
  subject: string;
  receivedDate: Date;
  priority: 'High' | 'Normal' | 'Low';
  currentQueue: string;
  status: string;
}

const ELEMENT_DATA: VipReference[] = [
  {
    referenceNo: 'VIP12345',
    subject: 'Road Construction Request',
    receivedDate: new Date('2025-04-01'),
    priority: 'High',
    currentQueue: 'VIP_Assignee',
    status: 'Pending'
  },
  {
    referenceNo: 'VIP12346',
    subject: 'Bridge Repair Update',
    receivedDate: new Date('2025-03-28'),
    priority: 'Normal',
    currentQueue: 'VIP_Final_Reply',
    status: 'Drafted'
  },
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
    currentQueue: 'VIP_Assigner',
    status: 'Assigned'
  },
  {
    referenceNo: 'VIP12349',
    subject: 'Garbage Collection Issue',
    receivedDate: new Date('2025-04-05'),
    priority: 'Normal',
    currentQueue: 'VIP_Assignee',
    status: 'In Progress'
  },
  {
    referenceNo: 'VIP12350',
    subject: 'Street Light Repair',
    receivedDate: new Date('2025-04-02'),
    priority: 'Low',
    currentQueue: 'VIP_Final_Reply',
    status: 'Completed'
  },
  {
    referenceNo: 'VIP12351',
    subject: 'Flood Relief Assistance',
    receivedDate: new Date('2025-04-06'),
    priority: 'High',
    currentQueue: 'VIP_Assigner',
    status: 'Pending'
  },
  {
    referenceNo: 'VIP12352',
    subject: 'Public Park Renovation',
    receivedDate: new Date('2025-04-04'),
    priority: 'Normal',
    currentQueue: 'VIP_Assignee',
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
    currentQueue: 'VIP_Final_Reply',
    status: 'Completed'
  }
]


@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit {
  selectedMenu:string="User Dashboard"
  isMenuOpen = false;
  @ViewChild('myChart') myChart: ElementRef | undefined;  // Access canvas via ViewChild
  chart: any;
  private router=inject(Router);


  public config: any = {
    type: 'doughnut',
    data: {
      labels: ['Inbox', 'Sent'],
      datasets: [
        {
          label: 'Messages',
          data: [120, 80], // Example: 120 inbox, 80 sent
          backgroundColor: ['rgba(0,123,255,0.5)', 'rgba(255,99,132,0.5)'],
          borderColor: ['rgba(0,123,255,1)', 'rgba(255,99,132,1)'],
          borderWidth: 1,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }

  };
  displayedColumns: string[] = [
    'referenceNo',
    'subject',
    'receivedDate',
    'priority',
    'currentQueue',
    'status',
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
  ngAfterViewInit() {
    this.renderChart();
  }
  renderChart() {
    setTimeout(() => {
      const canvas = this.myChart?.nativeElement;
      if (canvas) {
        this.chart = new Chart(canvas, this.config);
      }
    }, 1000);

    
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  viewReference(ref: VipReference) {
    // Placeholder for view logic, e.g. routing or dialog
    alert(`Viewing reference: ${ref.referenceNo}`);
  }

  getPriorityClass(priority: string): string {
    return priority === 'High' ? 'high-priority' : 'normal-priority';
  }

  
}
