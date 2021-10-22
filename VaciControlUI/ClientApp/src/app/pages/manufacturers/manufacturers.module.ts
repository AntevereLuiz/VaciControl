/* Sub modulo de rotas para Fabricantes*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManufacturerRoutingModule } from './manufacturers-routing.module';
import { ManufacturerListComponent } from './manufacturer-list/manufacturer-list.component';
import { ManufacturerFormComponent } from './manufacturer-form/manufacturer-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IMaskModule } from 'angular-imask';

@NgModule({
  declarations: [
    ManufacturerListComponent,
    ManufacturerFormComponent
  ],
  imports: [
    CommonModule,
    ManufacturerRoutingModule,
    ReactiveFormsModule,
    IMaskModule,
    FormsModule
  ]
})
export class ManufacturersModule { }
