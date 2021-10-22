import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginFormComponent } from './login-form/login-form.component';

const routes: Routes = [  
  { path : '', component: LoginFormComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)], /*Gerando as rotas*/
  exports: [RouterModule] /*Exportando as rotas*/
})
export class LoginRoutingModule { }
