
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { User } from '../../interface/user.model';
@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userDetails!:User;
  loginUserName:String="";
  @Output() menuToggled = new EventEmitter<boolean>();

  // constructor(private authService: AuthService) { }

  logout(): void {
    console.log('Logged out');
  }

  ngOnInit(){
    const userData=localStorage.getItem("user");

    if(userData){
      this.userDetails=JSON.parse(userData);
      
    }
  }
}
