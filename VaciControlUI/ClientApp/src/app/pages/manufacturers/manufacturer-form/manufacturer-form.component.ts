import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Manufacturer } from '../models/manufacturer.model';
import { ManufacturerService } from '../services/manufacturer.service';
import * as toastr from "toastr";
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-manufacturer-form',
  templateUrl: './manufacturer-form.component.html',
  styleUrls: ['./manufacturer-form.component.scss']
})
export class ManufacturerFormComponent implements OnInit {

  constructor(private manufacturerService: ManufacturerService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { }

  currentAction: string;
  manufacturerForm: FormGroup;
  serverErrorMessages: string[];
  submitiingForm: boolean = false;
  manufacturer: Manufacturer = new Manufacturer();

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildManufacturerForm();
    this.loadManufacturer();
  }

  private setCurrentAction() {
    if(this.route.snapshot.url[0].path == "new") {  //pode ser que esteja errado pro edit
      this.currentAction = "new";
    }
    else
    {
      this.currentAction = "edit";
    }
  }

  private buildManufacturerForm() {
    this.manufacturerForm = this.formBuilder.group({
      id:    [null],
      nome:  [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      cnpj:  [null, [Validators.required, Validators.minLength(18), Validators.maxLength(18)]],
      email: [null, [Validators.required, Validators.maxLength(50), Validators.email]]    
    });
  }

  private loadManufacturer() {
    if(this.currentAction == "edit"){
      this.route.paramMap.pipe(
        switchMap(params => this.manufacturerService.getById(Guid.parse(String(params.get("id")))))
      ).subscribe(
        (manufacturer) => {
          this.manufacturer = manufacturer;""
          this.manufacturerForm.patchValue(manufacturer);
        },
        (error) => toastr.error("Ocorreu um erro no servidor.")
      )
    }
  }

  submitForm(){
    this.submitiingForm = true;

    if(this.currentAction == "new"){
      this.createManufacturer();
    }
    else{
      this.updateManufacturer();
    }
  }

  private createManufacturer(){
    const manufacturer: Manufacturer = Object.assign(new Manufacturer(), this.manufacturerForm.value);

    this.manufacturerService.create(manufacturer)
    .subscribe(
      manufacturer => { this.actionsForSuccess(manufacturer); this.router.navigateByUrl('manufacturers')},
      error => this.actionsForError(error)
    )
  }

  private updateManufacturer(){
    const manufacturer: Manufacturer = Object.assign(new Manufacturer(), this.manufacturerForm.value);

    this.manufacturerService.update(manufacturer)
    .subscribe(
      manufacturer => { this.actionsForSuccess(manufacturer); this.router.navigateByUrl('manufacturers') },
      error => this.actionsForError(error)
    )
  }

  private actionsForSuccess(manufacturer: Manufacturer){
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
