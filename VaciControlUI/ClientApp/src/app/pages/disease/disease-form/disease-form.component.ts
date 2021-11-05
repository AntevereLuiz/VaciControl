import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import * as toastr from "toastr";
import { Guid } from 'guid-typescript';
import { DiseaseService } from '../services/disease.service';
import { Disease } from '../models/disease.model';

@Component({
  selector: 'app-disease-form',
  templateUrl: './disease-form.component.html',
  styleUrls: ['./disease-form.component.scss']
})
export class DiseaseFormComponent implements OnInit {

  constructor(private diseaseService: DiseaseService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { }

  currentAction: string;
  diseaseForm: FormGroup;
  serverErrorMessages: string[];
  submitiingForm: boolean = false;
  disease: Disease = new Disease();

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildDiseaseForm();
    this.loadDisease();
  }

  private setCurrentAction() {
    if (this.route.snapshot.url[0].path == "new") {
      this.currentAction = "new";
    }
    else {
      this.currentAction = "edit";
    }
  }

  private buildDiseaseForm() {
    this.diseaseForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    });
  }

  private loadDisease() {
    if (this.currentAction == "edit") {
      this.route.paramMap.pipe(
        switchMap(params => this.diseaseService.getById(Guid.parse(String(params.get("id")))))
      ).subscribe(
        (disease) => {
          this.disease = disease;
          this.diseaseForm.patchValue(disease);
        },
        (error) => toastr.error("Ocorreu um erro no servidor.")
      )
    }
  }

  submitForm() {
    this.submitiingForm = true;

    if (this.currentAction == "new") {
      this.createDisease();
    }
    else {
      this.updateDisease();
    }
  }

  private createDisease() {
    let disease: Disease = Object.assign(new Disease(), this.diseaseForm.value);

    this.diseaseService.create(disease)
      .subscribe(
        disease => { this.actionsForSuccess(disease); this.router.navigateByUrl('diseases') },
        error => this.actionsForError(error)
      )
  }

  private updateDisease() {
    let disease: Disease = Object.assign(new Disease(), this.diseaseForm.value);

    this.diseaseService.update(disease)
      .subscribe(
        disease => { this.actionsForSuccess(disease); this.router.navigateByUrl('diseases') },
        error => this.actionsForError(error)
      )
  }

  private actionsForSuccess(disease: Disease) {
    toastr.success("Solicitação efetuada com sucesso");
  }

  private actionsForError(error: any) {
    this.submitiingForm = false;
    toastr.error("Ecorreu um erro ao processar a sua solicitação.");

    if (error.status === 442) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    }
    else {
      this.serverErrorMessages = ["Falha na comunicação com o servidor"];
    }
  }
}