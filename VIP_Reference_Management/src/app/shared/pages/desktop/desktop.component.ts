import { Component } from '@angular/core';

@Component({
  selector: 'app-desktop',
  standalone: false,
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.css'
})
export class DesktopComponent {
  selectedQueue: string = '';
  queues = [
    { name: 'VIP Initiator', path: 'vip-initiator', icon:'person_add' },
    { name: 'VIP Assigner', path: 'vip-assigner', icon:'assignment_ind' },
    { name: 'VIP Assignee', path: 'vip-assignee', icon:'assignment_turned_in' },
    { name: 'VIP Final Reply', path: 'vip-final-reply', icon:'task_alt' }
  ];
}
