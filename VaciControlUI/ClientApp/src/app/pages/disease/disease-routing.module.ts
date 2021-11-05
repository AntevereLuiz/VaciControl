import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiseaseFormComponent } from './disease-form/disease-form.component';
import { DiseaseListComponent } from './disease-list/disease-list.component';

const routes: Routes = [
  {path: '', component: DiseaseListComponent},
  { path : 'new', component: DiseaseFormComponent },
  { path : 'edit/:id', component: DiseaseFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiseaseRoutingModule { }
