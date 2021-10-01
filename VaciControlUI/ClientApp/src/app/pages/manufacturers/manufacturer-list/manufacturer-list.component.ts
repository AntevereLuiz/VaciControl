import { Component, OnInit } from '@angular/core';

import { Manufacturer } from '../models/manufacturer.model';
import { ManufacturerService } from '../services/manufacturer.service';

@Component({
  selector: 'app-manufacturer-list',
  templateUrl: './manufacturer-list.component.html',
  styleUrls: ['./manufacturer-list.component.scss']
})
export class ManufacturerListComponent implements OnInit {

  manufacturers: Manufacturer[] = [];

  constructor(private manufacturerService: ManufacturerService) { }
  
  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.manufacturerService.getAll().subscribe(
      manufacturer => this.manufacturers = manufacturer,
      error => alert(`Erro ao listar os fabricantes: ${error}`)
    )
  }

  delete(manufacturer : Manufacturer){
    const mustDelete = confirm('Realmente deseja excluir esse fabricante?');

    if(mustDelete){
      this.manufacturerService.delete(manufacturer).subscribe(
        () => {
          alert('O fabricante foi excluído!');
          this.getAll();
        },
        () => toastr.error('Erro ao tentar excluir!'),
      )
    }
  }
}
