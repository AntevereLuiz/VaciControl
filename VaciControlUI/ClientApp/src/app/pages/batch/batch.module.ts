import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatchRoutingModule } from './batch-routing.module';
import { BatchListComponent } from './batch-list/batch-list.component';
import { BatchFormComponent } from './batch-form/batch-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IMaskModule } from 'angular-imask';
import { CalendarModule } from 'primeng/calendar';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    BatchListComponent,
    BatchFormComponent
  ],
  imports: [
    CommonModule,
    BatchRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    IMaskModule,
    FormsModule,
    CalendarModule
  ]
})
export class BatchModule { }
