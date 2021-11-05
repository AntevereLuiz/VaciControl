import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login', 
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)   
  },
  
  {
    path: 'users', 
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)
  },

  {
    path: 'manufacturers', 
    loadChildren: () => import('./pages/manufacturers/manufacturers.module').then(m => m.ManufacturersModule)
  },

  {
    path: 'patients', 
    loadChildren: () => import('./pages/patient/patient.module').then(m => m.PatientModule)
  },
  {
    path: 'diseases',
    loadChildren: () => import('./pages/disease/disease.module').then(m => m.DiseaseModule)
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, //Redireciona para a tela de login qnd se digita http://localhost:4200/
  { path: '**', redirectTo: 'login', pathMatch: 'full' }, //Redireciona para a tela de login qnd se digita, por exemplo, http://localhost:4200/asdfdsf
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
