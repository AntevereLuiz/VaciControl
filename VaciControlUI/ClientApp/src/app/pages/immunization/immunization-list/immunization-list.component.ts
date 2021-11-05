import { Component, OnInit } from '@angular/core';
// import { ImmunizationFilter } from '../filter/ImmunizationFilter';

import { Immunization } from '../models/immunization.model';
import { ImmunizationService } from '../services/immunization.service';
import * as toastr from "toastr";

@Component({
  selector: 'app-immunization-list',
  templateUrl: './immunization-list.component.html',
  styleUrls: ['./immunization-list.component.scss']
})
export class ImmunizationListComponent implements OnInit {

  immunizations: Immunization[] = [];
//   filter: ImmunizationFilter = { nome: '', 
//                          cpf: '', 
//                          campanha: '', 
//                          status: undefined };

  selectTypes = [ { nome: "Todos", valor: undefined }, 
                  { nome: "Ativos", valor: true }, 
                  { nome: "Inativos", valor: false } ];

  constructor(private immunizationService: ImmunizationService) { }

  ngOnInit(): void {
    // this.getAll();
  }

//   getAll(){
//     this.immunizationService.getAll(this.filter).subscribe(
//       immunizations => this.immunizations = immunizations,
//       error => toastr.error('Erro ao listar os pessoas imunizadas.')
//     )
//   }

  delete(immunization : Immunization){
    const mustDelete = confirm('Realmente deseja inativar essa imunização?');

    if(mustDelete){
      this.immunizationService.delete(immunization).subscribe(
        () => {
          toastr.success('Imunização inativada com sucesso!');
        //   this.getAll();
        },
        () => toastr.error('Erro ao tentar inativar!'),
      )
    }
  }

//   limparFiltros() {
//     this.filter = { nome: '', 
//                     cpf: '', 
//                     campanha: '', 
//                     status: undefined };
//   }
}