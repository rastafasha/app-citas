import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { StaffService } from '../../staff/service/staff.service';
import { DoctorService } from '../service/doctor.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss']
})
export class AddDoctorComponent {
  public routes = routes;
  public selectedValue!: string;

  public name: string = '';
  public surname: string = '';
  public phone: string = '';
  public email: string = '';
  public password: string = '';
  public password_confirmation: string = '';
  public birth_date: string = '';
  public gender: number = 1;
  public education: string = '';
  public designation: string = '';
  public address: string = '';

  public roles:any = [];
  public FILE_AVATAR:any;
  public IMAGE_PREVISUALIZA:any = 'assets/img/user-06.jpg';

  valid_form:boolean = false;
  valid_form_success:boolean = false;
  text_validation:any = null;

  public speciality_id:any;
  public specialities:any = [];
  public days_week = [
    {
      dayname:'Lunes',
      class: 'table-primary'
    },
    {
      dayname:'Martes',
      class: 'table-secondary'
    },
    {
      dayname:'Miercoles',
      class: 'table-success'
    },
    {
      dayname:'Jueves',
      class: 'table-waring'
    },
    {
      dayname:'Viernes',
      class: 'table-info'
    },
  ];

  public hours_days =[];

  constructor(
    public doctorService:DoctorService,
    public router: Router
  ){

  }

  ngOnInit(): void {
    this.getConfig();
  }

  getConfig(){
    this.doctorService.listConfig().subscribe((resp:any)=>{
      console.log(resp);
      // this.roles = resp.roles;
      // this.specialities = resp.specialities;
      // this.hours_days = resp.hours_days;
    })
  }

  loadFile($event:any){
    if($event.target.files[0].type.indexOf("image")){
      this.text_validation = 'Solamente pueden ser archivos de tipo imagen';
      return;
    }
    this.text_validation = '';
    this.FILE_AVATAR = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.FILE_AVATAR);
    reader.onloadend = ()=> this.IMAGE_PREVISUALIZA = reader.result;
  }

  save(){
    this.text_validation = null;
    if(!this.name||!this.email ||!this.surname ){
      this.text_validation = 'Los campos con * son obligatorios';
      return;
    }

    if(this.password != this.password_confirmation  ){
      this.text_validation = 'Las contraseña debe ser igual';
      return;
    }

    this.valid_form = false;
    console.log(this.selectedValue);
    let formData = new FormData();

    formData.append('name', this.name);
    formData.append('surname', this.surname);
    formData.append('phone', this.phone);
    formData.append('email', this.email);
    formData.append('password', this.password);
    formData.append('birth_date', this.birth_date);
    formData.append('gender', this.gender+'');
    formData.append('education', this.education);
    formData.append('designation', this.designation);
    formData.append('address', this.address);
    formData.append('role_id', this.selectedValue);
    formData.append('imagen', this.FILE_AVATAR);

    this.valid_form_success = false;
    this.text_validation = null;

    this.doctorService.storeDoctor(formData).subscribe((resp:any)=>{
      console.log(resp);
      if(resp.message == 403){
        this.text_validation = resp.message_text;
      }else{

        this.name = '';
        this.surname = '';
        this.phone = '';
        this.email = '';
        this.password = '';
        this.birth_date = '';
        this.education = '';
        this.designation = '';
        this.address = '';
        this.selectedValue = '';
        this.valid_form_success = true;
        this.router.navigate(['/staffs/list']);
      }
    })


  }
  
}
