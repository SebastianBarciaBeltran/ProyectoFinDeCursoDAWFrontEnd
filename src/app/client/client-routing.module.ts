import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthGuard } from '../guards/auth.guard';


import { ClientBodyComponent }     from './pages/client-body/client-body.component';
import { ClienthomeComponent }     from './pages/clienthome/clienthome.component';
import { ClientSettingsComponent } from './pages/userLogged/client-settings/client-settings.component';
import { UserloggedBodyComponent } from './pages/userLogged/userlogged-body/userlogged-body.component';
import { ClientcontactComponent } from './pages/clientcontact/clientcontact.component';


const routes: Routes = [
     {
       path:'', 
       component: ClientBodyComponent,
       children: [

        { path: '',  component: ClienthomeComponent },
        { path: 'contact',  component: ClientcontactComponent },

        // USUARIO LOGGED
        { path: 'account',  component: UserloggedBodyComponent, canActivate: [AuthGuard]},
        { path: 'account/settings',  component: ClientSettingsComponent, canActivate: [AuthGuard]},

        // CUALQUIER RUTA QUE NO EXISTA LA MANDO AL HOME
        { path: '', redirectTo: '', pathMatch: 'full' },


       ]
     }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
