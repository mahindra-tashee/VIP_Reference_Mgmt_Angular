
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() menuToggled = new EventEmitter<boolean>();

  user: string = 'Enea';

  // constructor(private authService: AuthService) { }

  logout(): void {
    console.log('Logged out');
  }
}
