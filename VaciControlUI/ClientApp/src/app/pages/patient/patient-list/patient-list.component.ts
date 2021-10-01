import { Component, OnInit } from '@angular/core';
import { PatientFilter } from '../filter/PatientFilter';
import { Patient } from '../models/patient.model';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

  patients: Patient[] = [];
  filter: PatientFilter = { nome: '', 
                            cpf: '', 
                            dataNascimento: undefined, 
                            email: '', 
                            status: undefined };

  selectTypes = [ { nome: "Todos", valor: undefined }, 
                  { nome: "Ativos", valor: true }, 
                  { nome: "Inativos", valor: false } ];

  constructor(private patientService: PatientService
              ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.patientService.getAll(this.filter).subscribe(
      patients => this.patients = patients,
      error => alert('Erro ao listar os usuários.')
    )
  }

}
