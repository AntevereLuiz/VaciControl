import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiseaseListComponent } from './disease-list/disease-list.component';

const routes: Routes = [
  {path: '', component: DiseaseListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiseaseRoutingModule { }
