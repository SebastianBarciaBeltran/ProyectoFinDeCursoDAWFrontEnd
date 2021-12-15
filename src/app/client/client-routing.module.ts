import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthGuard } from '../guards/auth.guard';


import { ClientBodyComponent }                from './pages/client-body/client-body.component';
import { ClienthomeComponent }                from './pages/clienthome/clienthome.component';
import { ClientSettingsComponent }            from './pages/userLogged/client-settings/client-settings.component';
import { UserloggedBodyComponent }            from './pages/userLogged/userlogged-body/userlogged-body.component';
import { ClientcontactComponent }             from './pages/clientcontact/clientcontact.component';
import { ClientnosotrosComponent }            from './pages/clientnosotros/clientnosotros.component';
import { ClientpreguntasfrecuentesComponent } from './pages/clientpreguntasfrecuentes/clientpreguntasfrecuentes.component';
import { ClientgarantiasComponent }           from './pages/clientgarantias/clientgarantias.component';
import { ClientserviciosComponent } from './pages/clientservicios/clientservicios.component';
import { ClientdescuentosComponent } from './pages/clientdescuentos/clientdescuentos.component';
import { ClientbeneficiariosComponent } from './pages/clientbeneficiarios/clientbeneficiarios.component';


const routes: Routes = [
     {
       path:'', 
       component: ClientBodyComponent,
       children: [

        { path: '',  component: ClienthomeComponent },
        { path: 'nosotros',  component: ClientnosotrosComponent },
        { path: 'garantias',  component: ClientgarantiasComponent },
        { path: 'servicios',  component: ClientserviciosComponent },
        { path: 'opticlub/descuentos',  component: ClientdescuentosComponent },
        { path: 'opticlub/beneficiarios',  component: ClientbeneficiariosComponent },
        { path: 'contacto',  component: ClientcontactComponent },
        { path: 'preguntas-frecuentes-covid19',  component: ClientpreguntasfrecuentesComponent },
        // USUARIO LOGGED
        { path: 'account',  component: UserloggedBodyComponent, canActivate: [AuthGuard]},
        { path: 'account/settings',  component: ClientSettingsComponent, canActivate: [AuthGuard]},

        // CUALQUIER RUTA QUE NO EXISTA LA MANDO AL HOME
        { path: '', redirectTo: 'es', pathMatch: 'full' },
        




       ]
     }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
