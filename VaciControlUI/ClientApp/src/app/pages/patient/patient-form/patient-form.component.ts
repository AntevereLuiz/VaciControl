import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Patient } from '../models/patient.model';
import { PatientService } from '../services/patient.service';
import * as toastr from "toastr";
import { Guid } from 'guid-typescript';
import * as moment from 'moment';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit {

  constructor(private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { }

  currentAction: string;
  patientForm: FormGroup;
  serverErrorMessages: string[];
  submitiingForm: boolean = false;
  patient: Patient = new Patient();
  yearRange: string = "1900:" + new Date().getFullYear().toString();
  dataNascimento: string;

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildPatientForm();
    this.loadPatient();
  }

  private setCurrentAction() {
    if (this.route.snapshot.url[0].path == "new") {
      this.currentAction = "new";
    }
    else {
      this.currentAction = "edit";
    }
  }

  private buildPatientForm() {
    this.patientForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      cpf: [null, [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      dataNascimento: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.email]],
      status: [null]
    });
  }

  private loadPatient() {
    if (this.currentAction == "edit") {
      this.route.paramMap.pipe(
        switchMap(params => this.patientService.getById(Guid.parse(String(params.get("id")))))
      ).subscribe(
        (patient) => {
          this.patient = patient;
          this.patient.dataNascimento = moment(this.patient.dataNascimento).format('DD/MM/YYYY');
          this.patientForm.patchValue(patient);
        },
        (error) => toastr.error("Ocorreu um erro no servidor.")
      )
    }
  }

  submitForm() {
    this.submitiingForm = true;

    if (this.currentAction == "new") {
      this.createPatient();
    }
    else {
      this.updatePatient();
    }
  }

  private createPatient() {
    let patient: Patient = Object.assign(new Patient(), this.patientForm.value);
    patient.dataNascimento = moment(patient.dataNascimento, 'DD/MM/YYYY').toDate();

    this.patientService.create(patient)
      .subscribe(
        patient => { this.actionsForSuccess(patient); this.router.navigateByUrl('patients') },
        error => this.actionsForError(error)
      )
  }

  private updatePatient() {
    let patient: Patient = Object.assign(new Patient(), this.patientForm.value);
    patient.dataNascimento = moment(patient.dataNascimento, 'DD/MM/YYYY').toDate();

    this.patientService.update(patient)
      .subscribe(
        patient => { this.actionsForSuccess(patient); this.router.navigateByUrl('patients') },
        error => this.actionsForError(error)
      )
  }

  private actionsForSuccess(patient: Patient) {
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
