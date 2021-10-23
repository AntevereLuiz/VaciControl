import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiseaseRoutingModule } from './disease-routing.module';
import { DiseaseListComponent } from './disease-list/disease-list.component';


@NgModule({
  declarations: [
    DiseaseListComponent
  ],
  imports: [
    CommonModule,
    DiseaseRoutingModule
  ]
})
export class DiseaseModule { }
