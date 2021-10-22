import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientListComponent } from './patient-list/patient-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IMaskModule } from 'angular-imask';
import {CalendarModule} from 'primeng/calendar';
import { PatientFormComponent } from './patient-form/patient-form.component';


@NgModule({
  declarations: [
    PatientListComponent,
    PatientFormComponent,
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    IMaskModule,
    FormsModule,
    CalendarModule
  ]
})
export class PatientModule { }
