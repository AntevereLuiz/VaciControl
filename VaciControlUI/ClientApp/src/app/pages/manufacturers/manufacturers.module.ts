/* Sub modulo de rotas para Fabricantes*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManufacturersRoutingModule } from './manufacturers-routing.module';
import { ManufacturerListComponent } from './manufacturer-list/manufacturer-list.component';
import { ManufacturerFormComponent } from './manufacturer-form/manufacturer-form.component';

@NgModule({
  declarations: [
    ManufacturerListComponent,
    ManufacturerFormComponent
  ],
  imports: [
    CommonModule,
    ManufacturersRoutingModule
  ]
})
export class ManufacturersModule { }
