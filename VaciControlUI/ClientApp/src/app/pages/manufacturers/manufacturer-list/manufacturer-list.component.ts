import { Component, OnInit } from '@angular/core';
import { ManufacturerFilter } from '../filter/ManufacturerFilter';

import { Manufacturer } from '../models/manufacturer.model';
import { ManufacturerService } from '../services/manufacturer.service';
import * as toastr from "toastr";


@Component({
  selector: 'app-manufacturer-list',
  templateUrl: './manufacturer-list.component.html',
  styleUrls: ['./manufacturer-list.component.scss']
})
export class ManufacturerListComponent implements OnInit {

  manufacturers: Manufacturer[] = [];

  filter: ManufacturerFilter = {
    nome: '', 
    cnpj: ''
  };

  constructor(private manufacturerService: ManufacturerService) { }
  
  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.manufacturerService.getAll(this.filter).subscribe(
      manufacturer => this.manufacturers = manufacturer,
      error =>  toastr.error('Erro ao listar os fabricantes.')      //exemplo de como identificar um erro: error => alert(`Erro ao listar os fabricantes: ${error}`)
    )
  }

  delete(manufacturer : Manufacturer){
    const mustDelete = confirm('Realmente deseja excluir esse fabricante?');

    if(mustDelete){
      this.manufacturerService.delete(manufacturer).subscribe(
        () => {
          toastr.success('O fabricante foi excluído!');
          this.getAll();
        },
        () => toastr.error('Erro ao tentar excluir!'),
      )
    }
  }

  limparFiltros() {
    this.filter = { nome: '', cnpj: '' };
  }
}
