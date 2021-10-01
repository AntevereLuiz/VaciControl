/* Sub modulo de rotas para Fabricantes*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManufacturerFormComponent } from './manufacturer-form/manufacturer-form.component';
import { ManufacturerListComponent } from './manufacturer-list/manufacturer-list.component';

/*Criando as Rotas*/
const routes: Routes = [
  { path : '', component: ManufacturerListComponent }, /*Desse jeito é só a listagem (MASTER)*/
  { path : 'new', component: ManufacturerFormComponent }, /*Desse jeito vai para a DETAIL*/
  { path : 'edit/:id', component: ManufacturerFormComponent }, /*Desse jeito vai para a DETAIL para editar*/
];


@NgModule({
  imports: [RouterModule.forChild(routes)], /*Gerando as rotas*/
  exports: [RouterModule] /*Exportando as rotas*/
})
export class ManufacturerRoutingModule { }
