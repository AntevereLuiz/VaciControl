import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { PatientFilter } from '../filter/PatientFilter';
import { Patient } from '../models/patient.model';
import { PatientService } from '../services/patient.service';
import * as toastr from "toastr";

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
  
  dataNascimento: string;
  yearRange: string = "1900:" + new Date().getFullYear().toString();

  selectTypes = [ { nome: "Todos", valor: undefined }, 
                  { nome: "Ativos", valor: true }, 
                  { nome: "Inativos", valor: false } ];

  constructor(private patientService: PatientService
              ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){

    if(this.dataNascimento)
      this.filter.dataNascimento = this.convertStringToDate(this.dataNascimento);

    this.patientService.getAll(this.filter).subscribe(
      patients => this.patients = patients,
      error => toastr.error('Erro ao listar os usuários.')
    )
  }

  convertStringToDate(date : string) : Date {
    return moment(date, 'DD/MM/YYYY').toDate();
  }

  delete(patient : Patient){
    const mustDelete = confirm('Realmente deseja inativar esse usuário?');

    if(mustDelete){
      this.patientService.delete(patient).subscribe(
        () => {
          toastr.success('O paciente foi inativado!')
          this.getAll();
        },
        () => toastr.error('Erro ao tentar excluir!'),
      )
    }
  }

  limparFiltros() {
    this.filter = { nome: '', 
                    cpf: '', 
                    dataNascimento: undefined, 
                    email: '', 
                    status: undefined };
    this.dataNascimento = '';
  }

}
