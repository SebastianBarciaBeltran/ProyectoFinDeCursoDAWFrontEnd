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
import { ClientserviciosComponent }           from './pages/clientservicios/clientservicios.component';
import { ClientdescuentosComponent }          from './pages/clientdescuentos/clientdescuentos.component';
import { ClientbeneficiariosComponent }       from './pages/clientbeneficiarios/clientbeneficiarios.component';
import { ClientMiSaludComponent }             from './pages/userLogged/client-mi-salud/client-mi-salud.component';
import { ClientMisCitasComponent }            from './pages/userLogged/client-mis-citas/client-mis-citas.component';
import { CitasBodyComponent }                 from './pages/citas/citas-body/citas-body.component';
import { CitasFechaComponent }                from './pages/citas/citas-fecha/citas-fecha.component';
import { BlogBodyComponent }                  from './pages/blog/blog-body/blog-body.component';
import { BlogComponent }                      from './pages/blog/blog/blog.component';
import { ClientproductsComponent } from './pages/clientproducts/clientproducts.component';


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
        { path: 'account/inicio',  component: UserloggedBodyComponent,    canActivate: [AuthGuard]},
        { path: 'account/mi-salud',  component: ClientMiSaludComponent,   canActivate: [AuthGuard]},
        { path: 'account/mis-citas',  component: ClientMisCitasComponent, canActivate: [AuthGuard]},
        { path: 'account/settings',  component: ClientSettingsComponent,  canActivate: [AuthGuard]},
        // RESERVAS / CITA 
        { path: 'cita/servicio',  component: CitasBodyComponent},
        { path: 'cita/elegir-fecha/:tipo',  component: CitasFechaComponent},
        // BLOG 
        { path: 'blog',  component: BlogBodyComponent},
        { path: 'blog/:id',  component: BlogComponent},
        // PRODUCTS
        { path: 'products',  component: ClientproductsComponent},
        { path: 'products/:tipo',  component: ClientproductsComponent},
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
