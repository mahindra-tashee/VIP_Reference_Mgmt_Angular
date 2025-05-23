import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interface/user.model';
import { ReferenceAssignment } from '../interface/reference-assignement.model';
import { API_ENDPOINTS } from '../utilities/api_endpoints';
import { VipReferenceDetailsResponse } from '../interface/reference-details-response.model';
import { UserList } from '../interface/user-list.model';
import { userInfo } from 'os';
import { State } from '../interface/state.model';


@Injectable({
  providedIn: 'root'
})
export class UsermgmtService {

  constructor(private http:HttpClient) { }


  loginVipUser(userLoginData: any): Observable<User>{
    return this.http.post<User>(`${API_ENDPOINTS.userMgmt}/login-user`,userLoginData)
  }

  getDashboardStats(userName:string):Observable<any>{
    return this.http.get<any>(`${API_ENDPOINTS.reference}/dashboard-stats/${userName}`)
  }

  getVipReferenceList(userName:string):Observable<any>{
    return this.http.get<any>(`${API_ENDPOINTS.reference}/reference-list/${userName}`)
  }

  getUserQueueList(userName:string):Observable<any>{
    return this.http.get<any>(`${API_ENDPOINTS.reference}/user/${userName}/queues`)
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

  updateReference(formData:any):Observable<string>{
    return this.http.patch(`${API_ENDPOINTS.reference}/updateReference`,formData,
      { responseType: 'text' ,headers:{}}
    )
  }

  getReferenceDetails(referenceNumber:any):Observable<VipReferenceDetailsResponse>{
    return this.http.get<VipReferenceDetailsResponse>(`${API_ENDPOINTS.reference}/reference-details/${referenceNumber}`)
  }



  // master data api

  getOrganizationList():Observable<any>{
    return this.http.get<any>(`${API_ENDPOINTS.referencemaster}/organization`)
  }

  getOfficeList(selectedOrganization:string):Observable<any>{
    return this.http.get<any>(`${API_ENDPOINTS.referencemaster}/get-office-types/${selectedOrganization}`);
  }

  getDesignationList(selectedOrganization:string):Observable<any>{
    return this.http.get<any>(`${API_ENDPOINTS.referencemaster}/get-designations/${selectedOrganization}`);
  }

  getVipDesignationList():Observable<any>{
    return this.http.get<any>(`${API_ENDPOINTS.referencemaster}/vip-designations`)
  }

  getUserList(userInfo:any):Observable<UserList>{
    return this.http.post<UserList>(`${API_ENDPOINTS.referencemaster}/get-users`,userInfo);
  }

  getStateList():Observable<State>{
    return this.http.get<State>(`${API_ENDPOINTS.referencemaster}/states`);
  }
  
}
