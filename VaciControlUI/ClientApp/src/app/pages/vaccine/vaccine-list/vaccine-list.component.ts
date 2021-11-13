import { Component, OnInit } from '@angular/core';
import { VaccineFilter } from '../filter/VaccineFilter';
import { Vaccine } from '../models/vaccine.model';
import { VaccineService } from '../services/vaccine.service';
import * as toastr from "toastr";

@Component({
  selector: 'app-vaccine-list',
  templateUrl: './vaccine-list.component.html',
  styleUrls: ['./vaccine-list.component.scss']
})
export class VaccineListComponent implements OnInit {

  vaccines: Vaccine[] = [];
  filter: VaccineFilter = { name: '',
                            disease: '',
                          };

  constructor(private vaccineService: VaccineService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.vaccineService.getAll(this.filter).subscribe(
      vaccines => this.vaccines = vaccines,
      error => toastr.error('Erro ao listar as vacinas.')
    )
  }

  delete(vaccine : Vaccine){
    const mustDelete = confirm('Realmente deseja excluir a vacina?');

    if(mustDelete){
      this.vaccineService.delete(vaccine).subscribe(
        () => {
          toastr.success('A vacina foi excluída!');
          this.getAll();
        },
        () => toastr.error('Erro ao tentar excluir!'),
      )
    }
  }

  limparFiltros() {
    this.filter = { name: '', 
                    disease: ''
                  };
  }
  
}
