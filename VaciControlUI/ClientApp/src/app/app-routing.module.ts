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

  {
    path: 'vaccines',
    loadChildren: () => import('./pages/vaccine/vaccine.module').then(m => m.VaccineModule)
  },

  {
    path: 'batches',
    loadChildren: () => import('./pages/batch/batch.module').then(m => m.BatchModule)
  },

  //TIVE QUE DEIXAR POR ÚLTIMO, POIS SENÃO DIRECIONA PARA LOGIN QUANDO CLICA EM DOENÇA, VACINA OU LOTE
  { path: '', redirectTo: 'login', pathMatch: 'full' }, //Redireciona para a tela de login qnd se digita http://localhost:4200/
  { path: '**', redirectTo: 'login', pathMatch: 'full' }, //Redireciona para a tela de login qnd se digita, por exemplo, http://localhost:4200/asdfdsf



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
