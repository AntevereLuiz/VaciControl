import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiseaseRoutingModule } from './disease-routing.module';
import { DiseaseListComponent } from './disease-list/disease-list.component';
import { DiseaseFormComponent } from './disease-form/disease-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IMaskModule } from 'angular-imask';


@NgModule({
  declarations: [
    DiseaseListComponent,
    DiseaseFormComponent
  ],
  imports: [
    CommonModule,
    DiseaseRoutingModule,
    ReactiveFormsModule,
    IMaskModule,
    FormsModule
  ]
})
export class DiseaseModule { }
