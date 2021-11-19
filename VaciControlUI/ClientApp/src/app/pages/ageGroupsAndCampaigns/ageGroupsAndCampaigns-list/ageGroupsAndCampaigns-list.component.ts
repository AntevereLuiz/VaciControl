import { Component, OnInit } from '@angular/core';

import { Campaigns } from '../models/Campaigns.model';
import { AgeGroupsAndCampaignsService } from '../services/ageGroupsAndCampaigns.service';
import * as toastr from "toastr";
import { CampaignFilter } from '../filter/CampaignFilter';

@Component({
    selector: 'app-ageGroupsAndCampaigns-list',
    templateUrl: './ageGroupsAndCampaigns-list.component.html',
    styleUrls: ['./ageGroupsAndCampaigns-list.component.scss']
  })

  export class AgeGroupsAndCampaignsListComponent implements OnInit {

    campaigns: Campaigns[] = [];
    filter: CampaignFilter = { campaignName: '', disease: '', status: undefined };     
  
    selectTypes = [ { nome: "Todos", valor: undefined }, 
                    { nome: "Ativos", valor: true }, 
                    { nome: "Inativos", valor: false } ];
  
    constructor(private ageGroupsAndCampaignsService: AgeGroupsAndCampaignsService) { }
  
    ngOnInit(): void {
      this.getAll();
    }
  
    getAll(){  
      this.ageGroupsAndCampaignsService.getAll(this.filter).subscribe(
        campaigns => this.campaigns = campaigns,
        error => alert('Erro ao listar as campanhas.')
      )
    }   
      
    delete(campaigns : Campaigns){
      const mustDelete = confirm('Realmente deseja inativar essa campanha?');
  
      if(mustDelete){
        this.ageGroupsAndCampaignsService.delete(campaigns).subscribe(
          () => {
            toastr.success('A campanha foi inativado!')
            this.getAll();
          },
          () => toastr.error('Erro ao tentar inativar!'),
        )
      }
    }
  
    limparFiltros() {
      this.filter = { campaignName: '', 
                      disease: '',                                             
                      status: undefined };
    }    
  }
  