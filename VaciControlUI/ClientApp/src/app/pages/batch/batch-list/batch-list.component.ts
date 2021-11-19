import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BatchFiler } from '../filter/BatchFilter';
import { Batch } from '../models/batch.model';
import { BatchService } from '../services/batch.service';
import * as toastr from "toastr";

@Component({
  selector: 'app-batch-list',
  templateUrl: './batch-list.component.html',
  styleUrls: ['./batch-list.component.scss']
})
export class BatchListComponent implements OnInit {

  batches: Batch[] = [];
  filter: BatchFiler = { nome: '',
                         fabricante: '',
                         dataValidade: undefined,
                         };
  
  dataValidade: string;
  yearRange: string = "1900:" + new Date().getFullYear().toString();

  constructor(private batchService: BatchService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.filter.dataValidade = this.dataValidade ? this.convertStringToDate(this.dataValidade) : undefined;
    this.batchService.getAll(this.filter).subscribe(
      batches => this.batches = batches,
      error => toastr.error('Erro ao listar os lotes.')
    )
  }

  convertStringToDate(date : string) : Date {
    return moment(date, 'DD/MM/YYYY').toDate();
  }

  delete(batch : Batch){
    const mustDelete = confirm('Realmente deseja excluir o lote?');

    if(mustDelete){
      this.batchService.delete(batch).subscribe(
        () => {
          toastr.success('O lote foi excluído!');
          this.getAll();
        },
        () => toastr.error('Erro ao tentar excluir!'),
      )
    }
  }

  limparFiltros() {
    this.filter = {
                    nome: '', 
                    fabricante: '',
                    dataValidade: undefined };
    this.dataValidade = '';
  }

}
