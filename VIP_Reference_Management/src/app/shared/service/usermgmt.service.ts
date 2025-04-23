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

  getDashboardStats(userId:number):Observable<any>{
    return this.http.get<any>(`http://localhost:4600/usermgmt/get-dashboard-stats/${userId}`)
  }

  getVipReferenceList(userId:number):Observable<any>{
    return this.http.get<any>(`http://localhost:4600/usermgmt/get-vip-reference-list/${userId}`)
  }

  getUserQueueList(userId:number):Observable<any>{
    return this.http.get<any>(`http://localhost:4600/usermgmt/user/${userId}/queues`)
  }
  getQueueReferencesList(queueData:any):Observable<any>{
    return this.http.post<any>("http://localhost:4600/usermgmt/user/queue/references",queueData)
  }
}
