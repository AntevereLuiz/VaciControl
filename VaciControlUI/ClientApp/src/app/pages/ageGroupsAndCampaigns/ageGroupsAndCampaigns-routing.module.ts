import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgeGroupsAndCampaignsFormComponent } from './ageGroupsAndCampaigns-form/ageGroupsAndCampaigns-form.component';
import { AgeGroupsAndCampaignsListComponent } from './ageGroupsAndCampaigns-list/ageGroupsAndCampaigns-list.component';

const routes: Routes = [
  { path : '', component: AgeGroupsAndCampaignsListComponent },
  { path : 'new', component: AgeGroupsAndCampaignsFormComponent },
  { path : 'edit/:id', component: AgeGroupsAndCampaignsFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgeGroupsAndCampaignsRoutingModule { }
