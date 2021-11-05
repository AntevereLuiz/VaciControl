import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImmunizationFormComponent } from './immunization-form/immunization-form.component';
import { ImmunizationListComponent } from './immunization-list/immunization-list.component';

const routes: Routes = [
  { path : '', component: ImmunizationListComponent },
  { path : 'new', component: ImmunizationFormComponent },
  { path : 'edit/:id', component: ImmunizationFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImmunizationRoutingModule { }
