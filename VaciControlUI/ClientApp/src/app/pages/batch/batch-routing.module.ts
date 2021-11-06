import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BatchFormComponent } from './batch-form/batch-form.component';
import { BatchListComponent } from './batch-list/batch-list.component';

const routes: Routes = [
  {path : '', component: BatchListComponent},
  {path : 'new', component: BatchFormComponent},
  {path: 'edit/:id', component: BatchFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatchRoutingModule { }
