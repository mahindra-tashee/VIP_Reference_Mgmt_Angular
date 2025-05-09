import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interface/user.model';
import { ReferenceAssignment } from '../interface/reference-assignement.model';
import { API_ENDPOINTS } from '../utilities/api_endpoints';
import { VipReferenceDetailsResponse } from '../interface/reference-details-response.model';


@Injectable({
  providedIn: 'root'
})
export class UsermgmtService {

  constructor(private http:HttpClient) { }


  loginVipUser(userLoginData: any): Observable<User>{
    return this.http.post<User>(`${API_ENDPOINTS.userMgmt}/login-user`,userLoginData)
  }

  getDashboardStats(userId:number):Observable<any>{
    return this.http.get<any>(`${API_ENDPOINTS.reference}/dashboard-stats/${userId}`)
  }

  getVipReferenceList(userId:number):Observable<any>{
    return this.http.get<any>(`${API_ENDPOINTS.reference}/reference-list/${userId}`)
  }

  getUserQueueList(userId:number):Observable<any>{
    return this.http.get<any>(`${API_ENDPOINTS.reference}/user/${userId}/queues`)
  }
  getQueueReferencesList(queueData:any):Observable<any>{
    return this.http.post<any>(`${API_ENDPOINTS.reference}/user/queue/references`,queueData)
  }

  addVipReferenceDetails(formData:FormData):Observable<string>{
    return this.http.post(`${API_ENDPOINTS.reference}/assign-reference`,formData,
      {
        responseType: 'text' ,
        headers:{

        }
      }
    )
  }

  getReferenceDetails(referenceNumber:string):Observable<VipReferenceDetailsResponse>{
    return this.http.get<VipReferenceDetailsResponse>(`${API_ENDPOINTS.reference}/reference-details/${referenceNumber}`)
  }
}
