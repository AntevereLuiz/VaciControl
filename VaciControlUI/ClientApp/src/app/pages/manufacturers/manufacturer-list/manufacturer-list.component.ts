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
    this.manufacturerService.getAll().subscribe(
      manufacturers => this.manufacturers = manufacturers,
      error => alert(`Erro: ${error}`)
    )
  }

}