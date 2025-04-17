import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ChangeDetectorRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('myChart') myChart: ElementRef | undefined;  // Access canvas via ViewChild
  chart: any;

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
  ngOnInit() {


  }
  ngAfterViewInit() {
    this.renderChart();
  }
  renderChart() {
    setTimeout(() => {
      const canvas = this.myChart?.nativeElement;
      console.log(canvas)
      if (canvas) {
        this.chart = new Chart(canvas, this.config);
      }
    }, 1000)
  }
}
