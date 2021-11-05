import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Immunization } from '../models/immunization.model';
import { ImmunizationService } from '../services/immunization.service';
import * as toastr from "toastr";
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-immunization-form',
  templateUrl: './immunization-form.component.html',
  styleUrls: ['./immunization-form.component.scss']
})
export class ImmunizationFormComponent implements OnInit {

  constructor(private immunizationService: ImmunizationService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) { }

  currentAction: string;
  immunizationForm: FormGroup;
  serverErrorMessages: string[];
  submitiingForm: boolean = false;
  immunization: Immunization = new Immunization();  
  dropdownVacina : any = ['Teste 1', 'Teste 2', 'Teste 3', 'Teste 4'];
  dropdownCampanha : any = ['Teste 1', 'Teste 2', 'Teste 3', 'Teste 4'];
  dropdownLote : any = ['Teste 1', 'Teste 2', 'Teste 3', 'Teste 4'];
  dropdownDose : any = ['Teste 1', 'Teste 2', 'Teste 3', 'Teste 4'];

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildImmunizationForm();
    this.loadImmunization();
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

  private buildImmunizationForm() {
    this.immunizationForm = this.formBuilder.group({
      id: [null],
      cpf: [null], 
      status: [null],                 
      idCampanha: [null],
      idVacina: [null],
      idLote: [null],
      dose: [null],      
    });
  }

  private loadImmunization() {
    if(this.currentAction == "edit"){
      this.route.paramMap.pipe(
        switchMap(params => this.immunizationService.getById(Guid.parse(String(params.get("id")))))
      ).subscribe(
        (immunization) => {
          this.immunization = immunization;
          this.immunizationForm.patchValue(immunization);
        },
        (error) => toastr.error("Ocorreu um erro no servidor.")
      )
    }
  }

  submitForm(){
    this.submitiingForm = true;

    if(this.currentAction == "new"){
      this.createImmunization();
    }
    else{
      this.updateImmunization();
    }
  }

  private createImmunization(){
    const immunization: Immunization = Object.assign(new Immunization(), this.immunizationForm.value);

    this.immunizationService.create(immunization)
    .subscribe(
      immunization => { this.actionsForSuccess(immunization); this.router.navigateByUrl('immunizations')},
      error => this.actionsForError(error)
    )
  }

  private updateImmunization(){
    const immunization: Immunization = Object.assign(new Immunization(), this.immunizationForm.value);

    this.immunizationService.update(immunization)
    .subscribe(
      immunization => { this.actionsForSuccess(immunization); this.router.navigateByUrl('immunizations')},
      error => this.actionsForError(error)
    )
  }

  private actionsForSuccess(immunization: Immunization){
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