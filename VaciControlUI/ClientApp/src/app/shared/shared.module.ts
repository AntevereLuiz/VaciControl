import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtivoInativoPipe } from './pipes/ativoinativo.pipe';


@NgModule({
  declarations: [
    AtivoInativoPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AtivoInativoPipe
  ]
})
export class SharedModule { }
