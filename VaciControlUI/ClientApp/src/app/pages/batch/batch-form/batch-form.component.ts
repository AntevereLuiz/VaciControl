import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Batch } from '../models/batch.model';
import { BatchService } from '../services/batch.service';
import * as toastr from "toastr";
import { Guid } from 'guid-typescript';
import * as moment from 'moment';

@Component({
  selector: 'app-batch-form',
  templateUrl: './batch-form.component.html',
  styleUrls: ['./batch-form.component.scss']
})
export class BatchFormComponent implements OnInit {

  vaccineTypes = [{ nome: "Selecione a vacina", valor: undefined }, 
                  { nome: "Vacina 1", valor: 1 }, 
                  { nome: "Vacina 2", valor: 2 } ];

  manufactureTypes = [{nome: "Selecione o fabricante", valor: undefined},
                       {nome: "Fabricante 1", valor: 1},
                       {nome: "Frabricante 2", valor: 2}];
  
  constructor(private batchService: BatchService,
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

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildBatchForm();
    this.loadBatch();
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
      nomeVacina: [null, [Validators.required]],
      lote: [null, [Validators.required]],
      fabricante: [null, [Validators.required]],
      qtdeFrascos: [null, [Validators.required]],
      dataEntrada: [null, [Validators.required]],
      dataValidade: [null, [Validators.required]],
      aplicacoesPorFrasco: [null, [Validators.required]],
      totalAplicacoesPossiveis: [null, [Validators.required]]
    });
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
