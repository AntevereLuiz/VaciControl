import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtivoInativoPipe } from './pipes/ativoinativo.pipe';
import { FormatadataPipe } from './pipes/formatadata.pipe';


@NgModule({
  declarations: [
    AtivoInativoPipe,
    FormatadataPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AtivoInativoPipe,
    FormatadataPipe
  ]
})
export class SharedModule { }
