import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';

import { NoPageFoundComponent } from './shared/no-page-found/no-page-found.component';

const routes: Routes = [
  
  
  { path: 'es',        loadChildren: () => import('./client/client.module').then( m => m.ClientModule )  },
  
  { path: 'customer',  loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ) },
  
  { path: 'dashboard', loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule ), canActivate: [AuthGuard] } ,

  { path: '', redirectTo: 'es', pathMatch: 'full' },
  
  { path: '**', component: NoPageFoundComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
