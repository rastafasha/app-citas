import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PatientMService {

  constructor(
    public http: HttpClient,
    public authService:AuthService
  ) { }

  listUsers(){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/patients';
    return this.http.get(URL, {headers:headers});
  }
  
  getUser(user_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/patients/show/'+user_id;
    return this.http.get(URL, {headers:headers});
  }
  createUser(data){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/patients/store';
    return this.http.post(URL,data, {headers:headers});
  }
  editUser( data:any, user_id:any,){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/patients/update/'+user_id;
    return this.http.put(URL,data,{headers:headers});
  }
  deleteUser(user_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/patients/destroy/'+user_id;
    return this.http.delete(URL, {headers:headers});
  }
}
