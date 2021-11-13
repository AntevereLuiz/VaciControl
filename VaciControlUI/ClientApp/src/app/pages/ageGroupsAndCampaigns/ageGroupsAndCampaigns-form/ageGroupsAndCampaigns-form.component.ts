import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import * as toastr from "toastr";
import { Guid } from 'guid-typescript';
import * as moment from 'moment';
import { AgeGroupsAndCampaignsService } from '../services/ageGroupsAndCampaigns.service';
import { Campaigns } from '../models/Campaigns.model';
import { AgeGroups } from './../models/AgeGroups.model';
import { DiseaseService } from './../../disease/services/disease.service';
import { DiseaseFilter } from '../../disease/filter/DiseaseFilter';
import { Disease } from '../../disease/models/disease.model';

@Component({
    selector: 'app-ageGroupsAndCampaigns-form',
    templateUrl: './ageGroupsAndCampaigns-form.component.html',
    styleUrls: ['./ageGroupsAndCampaigns-form.component.scss']
  })
export class AgeGroupsAndCampaignsFormComponent implements OnInit {    
    
    constructor(private ageGroupsAndCampaignsService: AgeGroupsAndCampaignsService,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private diseaseService: DiseaseService) { }
    
    currentAction: string;
    ageGroupsAndCampaignsForm: FormGroup;
    serverErrorMessages: string[];
    submitiingForm: boolean = false;
    campaign: Campaigns = new Campaigns(undefined, '', undefined, undefined, undefined, []);                  
    yearRange: string = "1900:" + new Date().getFullYear().toString();            
    initialDate: string;
    finalDate: string;            
    filter: DiseaseFilter = { nome: '' };
    diseases: Disease[] = [];
       
    ngOnInit(): void {      
      this.setCurrentAction();        
         
      if (this.currentAction = 'new') {
        this.campaign?.ageGroups?.push(new AgeGroups(undefined, undefined, undefined, undefined, undefined));
      } 
               
      this.buildAgeGroupsAndCampaignsForm();  
      this.inserir(0);      
      this.loadAgeGroupsAndCampaigns();
      this.getDiseases();
    }

    getDiseases(){
      this.diseaseService.getAll(this.filter).subscribe(
        (diseases) => { this.diseases = diseases; this.loadAgeGroupsAndCampaigns() },
        error => toastr.error('Erro ao listar as doenças.')
      )
    }

    private setCurrentAction() {
        if (this.route.snapshot.url[0].path == "new") {
          this.currentAction = "new";
        }
        else {
          this.currentAction = "edit";
        }
    }
    
    private buildAgeGroupsAndCampaignsForm() {
        this.ageGroupsAndCampaignsForm = this.formBuilder.group({
          id: [null],
          campaignName: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
          status: [null],
          disease:[null],
          ageGroups: this.formBuilder.array([]),         
        });
    }

    get ageGroups(): FormArray {
      return this.ageGroupsAndCampaignsForm.get('ageGroups') as FormArray;
    }
    
    private createAgeFormGroup(){
      return this.formBuilder.group({
        id:[null],
        minAge: [null, [Validators.required]],
        maxAge: [null, [Validators.required]],          
        dateIni: [null, [Validators.required]],
        dateFim: [null, [Validators.required]]
      })
    }

    private loadAgeGroupsAndCampaigns() {
        if (this.currentAction == "edit") {
          this.route.paramMap.pipe(
            switchMap(params => this.ageGroupsAndCampaignsService.getById(Guid.parse(String(params.get("id")))))
          ).subscribe(           
            (error) => toastr.error("Ocorreu um erro no servidor.")
          )
        }
    }

    submitForm() {
        this.submitiingForm = true;
    
        if (this.currentAction == "new") {
          this.createAgeGroupsAndCampaigns();
        }
        else {
          this.updateAgeGroupsAndCampaigns();
        }
    }
    
    public inserir(i: number){            
      const newAgeFormArray = this.ageGroupsAndCampaignsForm.get('ageGroups') as FormArray
      newAgeFormArray.push(this.createAgeFormGroup());
      this.ageGroupsAndCampaignsForm.get('ageGroups')?.setValue(newAgeFormArray.value);
      this.campaign.ageGroups?.push(newAgeFormArray.value[i]); 
    }

    public excluir(i: number){
      this.ageGroups.removeAt(i);
    }

    private createAgeGroupsAndCampaigns() {
        let ageGroupsAndCampaigns: Campaigns = Object.assign(new Campaigns(), this.ageGroupsAndCampaignsForm.value);        

        ageGroupsAndCampaigns.diseaseId = ageGroupsAndCampaigns.disease?.id;
        
        ageGroupsAndCampaigns?.ageGroups?.forEach(element => {
          element.dateIni =  moment(element.dateIni, 'DD/MM/YYYY').toDate();
          element.dateFim =  moment(element.dateFim, 'DD/MM/YYYY').toDate();          
        });             

        this.ageGroupsAndCampaignsService.create(ageGroupsAndCampaigns)
          .subscribe(
            ageGroupsAndCampaigns => { this.actionsForSuccess(ageGroupsAndCampaigns); this.router.navigateByUrl('ageGroupsAndCampaigns') },
            error => this.actionsForError(error)
        )
    }
    
    private updateAgeGroupsAndCampaigns() {
        let ageGroupsAndCampaigns: Campaigns = Object.assign(new Campaigns(), this.ageGroupsAndCampaignsForm.value);
        
        this.ageGroupsAndCampaignsService.update(ageGroupsAndCampaigns)
          .subscribe(
            ageGroupsAndCampaigns => { this.actionsForSuccess(ageGroupsAndCampaigns); this.router.navigateByUrl('ageGroupsAndCampaigns') },
            error => this.actionsForError(error)
          )
    }
    
    private actionsForSuccess(ageGroupsAndCampaigns: Campaigns) {
        toastr.success("Solicitação efetuada com sucesso");
    }
    
    private actionsForError(error: any) {
        this.submitiingForm = false;
        toastr.error("Ocorreu um erro ao processar a sua solicitação.");
    
        if (error.status === 442) {
          this.serverErrorMessages = JSON.parse(error._body).errors;
        }
        else {
          this.serverErrorMessages = ["Falha na comunicação com o servidor"];
        }
    }
}