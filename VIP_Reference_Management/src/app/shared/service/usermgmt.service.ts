import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interface/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsermgmtService {

  constructor(private http:HttpClient) { }


  loginVipUser(userLoginData: any): Observable<User>{
    return this.http.post<User>("http://localhost:4600/usermgmt/login-user",userLoginData)
  }
}
