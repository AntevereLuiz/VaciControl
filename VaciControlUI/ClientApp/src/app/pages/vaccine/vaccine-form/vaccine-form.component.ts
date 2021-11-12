import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Vaccine } from '../models/vaccine.model';
import { VaccineService } from '../services/vaccine.service';
import * as toastr from "toastr";
import { Guid } from 'guid-typescript';
import { DiseaseService } from '../../disease/services/disease.service';
import { Disease } from '../../disease/models/disease.model';
import { DiseaseFilter } from '../../disease/filter/DiseaseFilter';

@Component({
  selector: 'app-vaccine-form',
  templateUrl: './vaccine-form.component.html',
  styleUrls: ['./vaccine-form.component.scss']
})
export class VaccineFormComponent implements OnInit {

  constructor(private vaccineService: VaccineService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private diseaseService: DiseaseService) { }


  
  currentAction: string;
  vaccineForm: FormGroup;
  serverErrorMessages: string[];
  submitiingForm: boolean = false;
  vaccine: Vaccine = new Vaccine();
  diseases: Disease[] = [];

  filter: DiseaseFilter = { nome: '' };

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildVaccineForm();
    this.getDiseases();
  }

  getDiseases(){
    this.diseaseService.getAll(this.filter).subscribe(
      (diseases) => { this.diseases = diseases; this.loadVaccine() },
      error => toastr.error('Erro ao listar as doenças.')
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

  private buildVaccineForm(){
    this.vaccineForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      disease: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      intervaloProximaDose: [null, [Validators.required]]
    });
  }

  private loadVaccine() {
    if(this.currentAction == "edit"){
      this.route.paramMap.pipe(
        switchMap(params => this.vaccineService.getById(Guid.parse(String(params.get("id")))))
      ).subscribe(
        (vaccine) => {
          this.vaccine = vaccine;
          this.vaccineForm.patchValue(vaccine);
        },
        (error) => toastr.error("Ocorreu um erro no servidor.")
      )
    }
  }

  submitForm(){
    this.submitiingForm = true;

    if(this.currentAction == "new"){
      this.createVaccine();
    }
    else{
      this.updateVaccine();
    }
  }

  private createVaccine(){
    const vaccine: Vaccine = Object.assign(new Vaccine(), this.vaccineForm.value);
    vaccine.diseaseId = vaccine.disease?.id;
    
    this.vaccineService.create(vaccine)
    .subscribe(
      vaccine => { this.actionsForSuccess(vaccine); this.router.navigateByUrl('vaccines')},
      error => this.actionsForError(error)
    )
  }

  private updateVaccine(){
    const vaccine: Vaccine = Object.assign(new Vaccine(), this.vaccineForm.value);
    vaccine.diseaseId = vaccine.disease?.id;

    this.vaccineService.update(vaccine)
    .subscribe(
      vaccine => { this.actionsForSuccess(vaccine); this.router.navigateByUrl('vaccines')},
      error => this.actionsForError(error)
    )
  }

  private actionsForSuccess(vaccine: Vaccine){
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
