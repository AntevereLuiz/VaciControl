import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { PatientListComponent } from './patient-list/patient-list.component';

const routes: Routes = [
  { path : '', component: PatientListComponent },
  { path : 'new', component: PatientFormComponent },
  { path : 'edit/:id', component: PatientFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
