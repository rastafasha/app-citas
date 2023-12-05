import { Component } from '@angular/core';
import { DoctorService } from '../service/doctor.service';

@Component({
  selector: 'app-list-doctor',
  templateUrl: './list-doctor.component.html',
  styleUrls: ['./list-doctor.component.scss']
})
export class ListDoctorComponent {

  doctors: any = [];
  constructor(
    public doctorService:DoctorService
  ){}

  ngOnInit(): void {
    this.doctorService.listDoctors().subscribe((resp:any)=>{
      console.log(resp);
    })
    
  }
}
