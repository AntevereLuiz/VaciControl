import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImmunizationRoutingModule } from './immunization-routing.module';
import { ImmunizationListComponent } from './immunization-list/immunization-list.component';
import { ImmunizationFormComponent } from './immunization-form/immunization-form.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IMaskModule } from 'angular-imask';


@NgModule({
  declarations: [
    ImmunizationListComponent,
    ImmunizationFormComponent
  ],
  imports: [
    CommonModule,
    ImmunizationRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    IMaskModule,
    FormsModule
  ]
})
export class ImmunizationModule { }
