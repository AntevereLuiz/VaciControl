import { Component, OnInit } from '@angular/core';

//import { AgeGroupsAndCampaignsFilter } from '../filter/ageGroupsAndCampaignsFilter';
import { Campaigns } from '../models/Campaigns.model';
import { AgeGroupsAndCampaignsService } from '../services/ageGroupsAndCampaigns.service';
import * as toastr from "toastr";

@Component({
    selector: 'app-ageGroupsAndCampaigns-list',
    templateUrl: './ageGroupsAndCampaigns-list.component.html',
    styleUrls: ['./ageGroupsAndCampaigns-list.component.scss']
  })

  export class AgeGroupsAndCampaignsListComponent implements OnInit {

    campaigns: Campaigns[] = [];
    //filter: AgeGroupsAndCampaignsFilter = { campaignName: '', disease: '', status: undefined };     
  
    selectTypes = [ { nome: "Todos", valor: undefined }, 
                    { nome: "Ativos", valor: true }, 
                    { nome: "Inativos", valor: false } ];
  
    constructor(private ageGroupsAndCampaignsService: AgeGroupsAndCampaignsService) { }
  
    ngOnInit(): void {
      //this.getAll();
    }
  
    /*getAll(){  
      this.ageGroupsAndCampaignsService.getAll(this.filter).subscribe(
        ageGroupsAndCampaigns => this.ageGroupsAndCampaigns = ageGroupsAndCampaigns,
        error => alert('Erro ao listar as campanhas.')
      )
    }*/    
  
    /*
    delete(Campaigns : Campaigns){
      const mustDelete = confirm('Realmente deseja inativar essa Campanha?');
  
      if(mustDelete){
        this.ageGroupsAndCampaignsService.delete(ageGroupsAndCampaigns).subscribe(
          () => {
            toastr.success('A campanha foi inativado!')
            //this.getAll();
          },
          () => toastr.error('Erro ao tentar excluir!'),
        )
      }
    }
  
    limparFiltros() {
      this.filter = { campaignName: '', 
                      disease: '',                                             
                      status: undefined };
    }*/
  
  }
  