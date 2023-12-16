import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { routes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public routes = routes;
  public passwordClass = false;
 public ERROR = false;
 public user:any;
 public roles:any;

  form = new FormGroup({
    email: new FormControl('superadmin@superadmin.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('password', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  constructor(
    public auth: AuthService,
    public router:Router
    ) {
      let USER = localStorage.getItem("user");
      if(localStorage.getItem("user")){
        this.user = JSON.parse(USER ? USER: '');
      }
    }

  ngOnInit(): void {
    // if (localStorage.getItem('authenticated')) {
    //   localStorage.removeItem('authenticated');
    // }
    localStorage.getItem('user')
  }

  loginFormSubmit() {
    if (this.form.valid) {
      this.ERROR = false;
      this.auth.login(
        this.form.value.email ? this.form.value.email :'',
        this.form.value.password ? this.form.value.password: ''
        ).subscribe((resp:any)=>{
          // console.log(resp);
          if(resp){
            //login exitoso
            setTimeout(()=>{
              if(this.user.roles == 'DOCTOR'){
                this.router.navigate([routes.doctorDashboard]);
  
              }else{
                this.router.navigate([routes.adminDashboard]);
              }

            },100)

          }else{
            //login fallido
            this.ERROR = true;
          }
        },error =>{
          console.log(error);
        });
    }
  }
  togglePassword() {
    this.passwordClass = !this.passwordClass;
  }
}
