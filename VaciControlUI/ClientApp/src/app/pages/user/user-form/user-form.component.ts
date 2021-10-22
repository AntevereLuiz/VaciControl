import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import * as toastr from "toastr";
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) { }

  currentAction: string;
  userForm: FormGroup;
  serverErrorMessages: string[];
  submitiingForm: boolean = false;
  user: User = new User();

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildUserForm();
    this.loadUser();
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

  private buildUserForm() {
    this.userForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      cpf: [null, [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      email: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.email]],
      tipo: [null],
      status: [null]
    });
  }

  private loadUser() {
    if(this.currentAction == "edit"){
      this.route.paramMap.pipe(
        switchMap(params => this.userService.getById(Guid.parse(String(params.get("id")))))
      ).subscribe(
        (user) => {
          this.user = user;
          this.userForm.patchValue(user);
        },
        (error) => toastr.error("Ocorreu um erro no servidor.")
      )
    }
  }

  submitForm(){
    this.submitiingForm = true;

    if(this.currentAction == "new"){
      this.createUser();
    }
    else{
      this.updateUser();
    }
  }

  private createUser(){
    const user: User = Object.assign(new User(), this.userForm.value);

    this.userService.create(user)
    .subscribe(
      user => { this.actionsForSuccess(user); this.router.navigateByUrl('users')},
      error => this.actionsForError(error)
    )
  }

  private updateUser(){
    const user: User = Object.assign(new User(), this.userForm.value);

    this.userService.update(user)
    .subscribe(
      user => { this.actionsForSuccess(user); this.router.navigateByUrl('users')},
      error => this.actionsForError(error)
    )
  }

  private actionsForSuccess(user: User){
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