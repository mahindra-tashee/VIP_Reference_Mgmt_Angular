import { AfterViewInit, Component, ElementRef, EventEmitter, inject, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ChangeDetectorRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { User } from '../../interface/user.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ViewReferenceComponent } from '../view-reference/view-reference.component';
import { UsermgmtService } from '../../service/usermgmt.service';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ToastrService } from 'ngx-toastr';
Chart.register(...registerables);

export interface VipReference {
  referenceNo: string;
  subject: string;
  receivedDate: Date;
  priority: 'High' | 'Normal' | 'Low';
  currentQueue: string;
  status: string;
}


@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit {
  userDetails!:User;
  selectedMenu:string="User Dashboard";
  isMenuOpen = false;
  @ViewChild('myChart') myChart: ElementRef | undefined;  // Access canvas via ViewChild
  chart: any;
  private router=inject(Router);
  private dialog=inject(MatDialog);
  private userMgmtService = inject(UsermgmtService);
  private ngxService= inject(NgxUiLoaderService);
  private toastr= inject(ToastrService);


  public config: any;
  displayedColumns: string[] = [
    'referenceNo',
    'subject',
    'receivedDate',
    'prirority',
    'currentQueue',
    'status',
    'actions'
  ];
  VipReferenceData = new MatTableDataSource<VipReference>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit() {
    this.getUserDetails();
    this.getDashboardStats();
    this.getVipReferenceList();
  }
  ngAfterViewInit() {
    this.renderChart();
  }
  renderChart() {
    this.ngxService.start();
    setTimeout(() => {
      const canvas = this.myChart?.nativeElement;
      if (canvas) {
        this.chart = new Chart(canvas, this.config);
        this.ngxService.stop();
      }
    }, 1000);
  }

  getUserDetails(){
    const userData=localStorage.getItem("user");
    if(userData){
      this.userDetails=JSON.parse(userData);
    }
  }

  getDashboardStats(){
    this.ngxService.start();
    this.userMgmtService.getDashboardStats(this.userDetails.userId).subscribe({
      next:(res:any)=>{
        const response=res;
        console.log(res)
        this.config = {
          type: 'doughnut',
          data: {
            labels: response.chartData.labels,
            datasets: [
              {
                label: 'Messages',
                data: response.chartData.data,
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
        this.ngxService.stop();
      },
      error:(err:any)=>{
        this.toastr.error("No Dashboard Data found for this user");
        this.ngxService.stop();
      }
    })
  }

  getVipReferenceList(){
    this.ngxService.start()
    this.userMgmtService.getVipReferenceList(this.userDetails.userId).subscribe({
      next:(res)=>{
        this.VipReferenceData.data=res;
        this.initiatePaginator();
      },
      error:(err)=>{
        this.toastr.error("No references found for this user");
        this.ngxService.stop();
      }
    })
  }

  initiatePaginator(){
    setTimeout(()=>{
      this.VipReferenceData.paginator = this.paginator;
      this.VipReferenceData.sort = this.sort;
      this.ngxService.stop();
    },500);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.VipReferenceData.filter = filterValue;
  }

  viewReference(ref: VipReference) {
    const viewReferenceDialog=this.dialog.open(ViewReferenceComponent,{
      data:ref
    });
  }

  getPriorityClass(priority: string): string {
    return priority === 'High' ? 'high-priority' : 'normal-priority';
  }
}
