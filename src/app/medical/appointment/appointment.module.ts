import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { AppointmentComponent } from './appointment.component';
import { AddAppointmentsComponent } from './add-appointments/add-appointments.component';
import { EditAppointmentsComponent } from './edit-appointments/edit-appointments.component';
import { ListAppointmentsComponent } from './list-appointments/list-appointments.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AppointmentComponent,
    AddAppointmentsComponent,
    EditAppointmentsComponent,
    ListAppointmentsComponent
  ],
  exports: [
    AppointmentComponent,
    AddAppointmentsComponent,
    EditAppointmentsComponent,
    ListAppointmentsComponent
  ],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ]
})
export class AppointmentModule { }