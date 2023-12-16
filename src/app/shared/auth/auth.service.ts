import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { BehaviorSubject } from 'rxjs';
import { routes } from '../routes/routes';
import { url_servicios } from 'src/app/config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  user:any;
  token:any;

  constructor(
    private router: Router,
    public http: HttpClient
    ) {
      this.getLocalStorage();//devuelve el usuario logueado
    }

    

 login(email:any, password:any) {
    // localStorage.setItem('authenticated', 'true');
    // this.router.navigate([routes.adminDashboard]);
    let URL = url_servicios+"/login";
    return this.http.post(URL,{email:email, password:password}).pipe(
      map((auth:any)=>{
        // console.log(auth);
        const result = this.guardarLocalStorage(auth);
        return result;
      }),
      catchError((error:any)=>{
        console.log(error);
        return of(undefined);
      })
    );
  }


  guardarLocalStorage( auth: any){
    // localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(auth.user));
    localStorage.setItem("token", auth.access_token.original.access_token);

    localStorage.setItem("authenticated", 'true');
    return true;
  }


  getLocalStorage(){
    if(localStorage.getItem('token') && localStorage.getItem('user')){
      let USER = localStorage.getItem('user');
      this.user = JSON.parse(USER ? USER: '');
      this.token = localStorage.getItem('token');
    }else{
      this.user = null;
      this.token = null;
    }
 }

 getUserRomoto(data){
  let headers = new HttpHeaders({'Authorization': 'Bearer'+this.token})
  let URL = url_servicios+'/me';
  return this.http.post(URL,data, {headers:headers});
 }
  

 

 logout(){
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('authenticated');
  this.router.navigate([routes.login]);
 }

  
}
