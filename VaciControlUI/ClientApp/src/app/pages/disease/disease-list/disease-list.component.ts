import { Component, OnInit } from '@angular/core';
import { DiseaseFilter } from '../filter/DiseaseFilter';
import { Disease } from '../models/disease.model';
import { DiseaseService } from '../services/disease.service';
import * as toastr from "toastr";

@Component({
  selector: 'app-disease-list',
  templateUrl: './disease-list.component.html',
  styleUrls: ['./disease-list.component.scss']
})
export class DiseaseListComponent implements OnInit {

  diseases: Disease[] = [];
  filter: DiseaseFilter = {nome: ''};

  constructor(private diseaseService: DiseaseService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.diseaseService.getAll(this.filter).subscribe(
      diseases => this.diseases = diseases,
      error => toastr.error('Erro ao listar as doenças.')
    )
  }

  delete(disease : Disease){
    const mustDelete = confirm('Realmente deseja excluir essa doença?');

    if(mustDelete){
      this.diseaseService.delete(disease).subscribe(
        () => {
          toastr.success('A doença foi excluída!');
          this.getAll();
        },
        () => toastr.error('Erro ao tentar excluir!'),
      )
    }
  }

  limparFiltros() {
    this.filter = { nome: '' };
  }

}
