import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpClient } from 'app/core/utility/http.client';
import { Http } from '@angular/http';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable'; // <--- This changes from the first Example!


@Injectable()
export class UserService {
  constructor(
    private http: HttpClient
  ) { }

  // contractorLocation = (userId: any) => {
  //   return IntervalObservable
  //     .create(50000)
  //     .flatMap((i) => this.http.post('/getUserTracking', userId))
  // }
  contractorLocation(userId:any): Observable<any> { 
    return this.http.post('/getUserTracking',userId);
  }
  verifyEmail(data: any): Observable<any> {
    return this.http.post('/user/verifyemail', data);
  }

  verifySetPwdKey(data: any): Observable<any> {
    return this.http.post('/user/chksetpasswordkey', data);
  }
 
  setPwd(data: any): Observable<any> {
    return this.http.post('/user/setpassword', data);
  }

  reqResetPassword(data: any): Observable<any> {
    return this.http.post('/user/reqresetpassword', data);
  }

  verifyReSetPwdKey(data: any): Observable<any> {
    return this.http.post('/user/chkresetpasswordkey', data);
  }

  reSetPwd(data: any): Observable<any> {
    return this.http.post('/user/resetpassword', data);
  }

  
  getAdminProfile(id:any): Observable<any> { 
    return this.http.get('/getAdminProfile',id);
  }

  adminProfileUpdate(data: any): Observable<any> {
    return this.http.post('/adminProfileUpdate', data);
  }
  updateSAProfile(data: any): Observable<any> {
    return this.http.post('/user/updatesaprofile', data);
  }

  updatePwd(data: any): Observable<any> {
    return this.http.post('/user/updatepassword', data);
  }

  //appuser start
  getAppuser(id: any): Observable<any> { 
    return this.http.get('/getUserByIdAdmin',id);
  }
  getAppuserList(data: any): Observable<any> {
    return this.http.get('/getAllUser', data);
  }

  addUserByAdmin(data: any): Observable<any> {
    return this.http.post('/addUserByAdmin', data);
  }

  editAppuser(data: any): Observable<any> {
    return this.http.post('/updateUser', data);
  }

  deleteAppuser(data: any): Observable<any> {
    return this.http.post('/deleteUserById', data);
  }
  //appuser end
  
  //notification
  getAdminNotigications(): Observable<any> {
    return this.http.get('/user/getadminnotifications', []);
  }

}
