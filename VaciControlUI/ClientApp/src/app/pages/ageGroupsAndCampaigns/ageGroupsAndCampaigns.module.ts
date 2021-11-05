import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgeGroupsAndCampaignsRoutingModule } from './ageGroupsAndCampaigns-routing.module';
import { AgeGroupsAndCampaignsListComponent } from './ageGroupsAndCampaigns-list/ageGroupsAndCampaigns-list.component';
import { AgeGroupsAndCampaignsFormComponent } from './ageGroupsAndCampaigns-form/ageGroupsAndCampaigns-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IMaskModule } from 'angular-imask';
import {CalendarModule} from 'primeng/calendar';


@NgModule({
  declarations: [
    AgeGroupsAndCampaignsListComponent,
    AgeGroupsAndCampaignsFormComponent,
  ],
  imports: [
    CommonModule,
    AgeGroupsAndCampaignsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    IMaskModule,
    FormsModule,
    CalendarModule
  ]
})
export class AgeGroupsAndCampaignsModule { }