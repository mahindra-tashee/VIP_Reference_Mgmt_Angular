import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  opened = true;

  toggle(): void {
    this.opened = !this.opened;
  }

  menu: any = [
    {
      title: 'Dashboard',
      icon: 'home',
      link: '/dashboard',
      color: '#ff7f0e',
    },
    {
      title: 'Desktop',
      icon: 'home',
      link: '/dashboard/desktop',
      color: '#ff7f0e',
    },
    {
      title: 'Statistics',
      icon: 'bar_chart',
      color: '#ff7f0e',
      subMenu: [
        {
          title: 'Sales',
          icon: 'money',
          link: '/sales',
          color: '#ff7f0e',
        },
        {
          title: 'Customers',
          icon: 'people',
          color: '#ff7f0e',
          link: '/customers',
        },
      ],
    },
  ];

}
