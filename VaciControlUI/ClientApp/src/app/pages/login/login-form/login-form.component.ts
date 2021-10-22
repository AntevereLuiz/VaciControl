import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as toastr from "toastr";
import { UserService } from '../../user/services/user.service'; 

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { } 

  //currentAction: string;
  //loginForm: FormGroup;
  //serverErrorMessages: string[];  
  //submitiingForm: boolean = false;  
  //users: any[] = [];
  //user: any = {};
  userLogin: any = {};
  userLogged: any = {};
  isAuthenticated: boolean = false;

  ngOnInit(): void { 
    //this.setCurrentAction();
    //this.buildLoginForm();
  }

  /*private setCurrentAction() {
    if(this.route.snapshot.url[0].path == "login") {
      this.currentAction = "menuPrincipal";
    }    
  }
   
  submitForm(){
    this.submitiingForm = true;
    this.authenticate();    
  }*/
 
  
  authenticate(){
    this.userService.authenticate(this.userLogin).subscribe((data:any) => {
      if (data.user) {
        localStorage.setItem('user_logged', JSON.stringify(data));
        //this.isAuthenticated = true;
        //this.get();
        this.getUserData();
      } else {
        alert('Usuário inválido.');
      }      
    }, error => {
      console.log(error);
        alert('Erro ao tentar realizar o login no sistema.');
    })
  }

  
  getUserData() {
    this.userLogged = JSON.parse(localStorage.getItem('user_logged')  || '{}'); // || '{}' Acrescentei isso porque estava dadno erro
    this.isAuthenticated = this.userLogged != null;
  }
  

  /*
  private buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      id: [null],     
      cpf: [null, [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],     
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]], 
      tipo: [null],
      status: [null]
    });
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
  */
}
