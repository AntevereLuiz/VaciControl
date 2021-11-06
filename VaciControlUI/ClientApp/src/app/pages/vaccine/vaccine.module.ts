import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VaccineRoutingModule } from './vaccine-routing.module';
import { VaccineListComponent } from './vaccine-list/vaccine-list.component';
import { VaccineFormComponent } from './vaccine-form/vaccine-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IMaskModule } from 'angular-imask';


@NgModule({
  declarations: [
    VaccineListComponent,
    VaccineFormComponent
  ],
  imports: [
    CommonModule,
    VaccineRoutingModule,
    ReactiveFormsModule,
    IMaskModule,
    FormsModule
  ]
})
export class VaccineModule { }
