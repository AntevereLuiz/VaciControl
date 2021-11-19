import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Batch } from '../models/batch.model';
import { BatchService } from '../services/batch.service';
import * as toastr from "toastr";
import { Guid } from 'guid-typescript';
import * as moment from 'moment';
import { Vaccine } from '../../vaccine/models/vaccine.model';
import { Manufacturer } from '../../manufacturers/models/manufacturer.model';
import { VaccineService } from '../../vaccine/services/vaccine.service';
import { ManufacturerService } from '../../manufacturers/services/manufacturer.service';
import { VaccineFilter } from '../../vaccine/filter/VaccineFilter';
import { ManufacturerFilter } from '../../manufacturers/filter/ManufacturerFilter';

@Component({
  selector: 'app-batch-form',
  templateUrl: './batch-form.component.html',
  styleUrls: ['./batch-form.component.scss']
})
export class BatchFormComponent implements OnInit {


  
  constructor(private batchService: BatchService,
              private vaccineService: VaccineService,
              private manufacturerService: ManufacturerService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) { }

  currentAction: string;
  batchForm: FormGroup;
  serverErrorMessages: string[];
  submitiingForm: boolean = false;
  batch: Batch = new Batch();
  yearRange: string = "1900:" + new Date().getFullYear().toString();
  dataEntrada: string;
  dataValidade: string;
  vaccineTypes: Vaccine[] = [];
  manufactureTypes: Manufacturer[] = [];
  vaccineFilter: VaccineFilter = { name:'', disease:'' };
  manufacturerFilter: ManufacturerFilter = { nome:'', cnpj:'' };
  apFrascos: number;
  qtFrascos: number;
  totApli: number;

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildBatchForm();
    this.loadVaccines();
  }

  loadVaccines() {
    this.vaccineService.getAll(this.vaccineFilter).subscribe(
      (vaccines) => { this.vaccineTypes = vaccines; this.loadManufatures();},
      error => toastr.error('Erro ao listar as vacinas.')
    )
  }

  loadManufatures() {
    this.manufacturerService.getAll(this.manufacturerFilter).subscribe(
      (manufactures) => { this.manufactureTypes = manufactures; this.loadBatch();},
      error => toastr.error('Erro ao listar as fabricantes.')
    )
  }

  private setCurrentAction() {
    if(this.route.snapshot.url[0].path == "new") {
      this.currentAction = "new";
    }
    else
    {
      this.currentAction = "edit";
    }
  }

  private buildBatchForm() {
    this.batchForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required]],
      vacina: [null, [Validators.required]],
      fabricante: [null, [Validators.required]],
      qtdeFrascos: [null, [Validators.required]],
      dataEntrada: [null, [Validators.required]],
      dataValidade: [null, [Validators.required]],
      aplicacoesPorFrasco: [null, [Validators.required]],
      totalAplicacoesPossiveis: [this.calculaQtd(), [Validators.required]]
    });
  }

  calculaQtd(): any {
    this.totApli = !isNaN(this.qtFrascos * this.apFrascos) ? this.qtFrascos * this.apFrascos : 0;
    return !isNaN(this.qtFrascos * this.apFrascos) ? this.qtFrascos * this.apFrascos : 0;
  }

  private loadBatch() {
    if (this.currentAction == "edit") {
      this.route.paramMap.pipe(
        switchMap(params => this.batchService.getById(Guid.parse(String(params.get("id")))))
      ).subscribe(
        (batch) => {
          this.batch = batch;
          this.batch.dataEntrada = moment(this.batch.dataEntrada).format('DD/MM/YYYY');
          this.batch.dataValidade = moment(this.batch.dataValidade).format('DD/MM/YYYY');
          this.batchForm.patchValue(batch);
        },
        (error) => toastr.error("Ocorreu um erro no servidor.")
      )
    }
  }

  submitForm(){
    this.submitiingForm = true;

    if(this.currentAction == "new"){
      this.createBatch();
    }
    else{
      this.updateBatch();
    }
  }

  private createBatch(){
    const batch: Batch = Object.assign(new Batch(), this.batchForm.value);
    batch.dataEntrada = moment(batch.dataEntrada, 'DD/MM/YYYY').toDate();
    batch.dataValidade = moment(batch.dataValidade, 'DD/MM/YYYY').toDate();
    batch.vacinaId = batch.vacina?.id;
    batch.fabricanteId = batch.fabricante?.id;

    this.batchService.create(batch)
    .subscribe(
      batch => { this.actionsForSuccess(batch); this.router.navigateByUrl('batches')},
      error => this.actionsForError(error)
    )
  }

  private updateBatch(){
    const batch: Batch = Object.assign(new Batch(), this.batchForm.value);
    batch.dataEntrada = moment(batch.dataEntrada, 'DD/MM/YYYY').toDate();
    batch.dataValidade = moment(batch.dataValidade, 'DD/MM/YYYY').toDate();

    this.batchService.update(batch)
    .subscribe(
      batch => { this.actionsForSuccess(batch); this.router.navigateByUrl('batches')},
      error => this.actionsForError(error)
    )
  }

  private actionsForSuccess(batch: Batch){
    toastr.success("Solicitação efetuada com sucesso");
  }

  private actionsForError(error: any){
    this.submitiingForm = false;
    toastr.error("Ocorreu um erro ao processar a sua solicitação.");

    if(error.status === 442){
      this.serverErrorMessages = JSON.parse(error._body).errors;
    }
    else{
      this.serverErrorMessages = ["Falha na comunicação com o servidor"];
    }
  }
}
