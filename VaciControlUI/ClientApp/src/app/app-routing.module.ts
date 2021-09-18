import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'users', 
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)
  },

  {
    path: 'manufacturers', 
    loadChildren: () => import('./pages/manufacturers/manufacturers.module').then(m => m.ManufacturersModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
