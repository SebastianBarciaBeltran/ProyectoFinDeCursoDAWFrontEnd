import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NoPageFoundComponent } from './shared/no-page-found/no-page-found.component';

const routes: Routes = [
  
  
  { path: 'home', loadChildren: () => import('./client/client.module').then( m => m.ClientModule )  },
  
  { path: 'customer', loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ) },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  
  { path: '**', component: NoPageFoundComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
