import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { AngularPrimeNgModule } from '../angular-prime-ng/angular-prime-ng.module';

import { ClienthomeComponent }                from './pages/clienthome/clienthome.component';
import { ClientBodyComponent }                from './pages/client-body/client-body.component';
import { UserloggedBodyComponent }            from './pages/userLogged/userlogged-body/userlogged-body.component';
import { ClientSettingsComponent }            from './pages/userLogged/client-settings/client-settings.component';
import { ClientcontactComponent }             from './pages/clientcontact/clientcontact.component';
import { ClientnosotrosComponent }            from './pages/clientnosotros/clientnosotros.component';
import { ClientpreguntasfrecuentesComponent } from './pages/clientpreguntasfrecuentes/clientpreguntasfrecuentes.component';
import { ClientgarantiasComponent }           from './pages/clientgarantias/clientgarantias.component';
import { ClientserviciosComponent }           from './pages/clientservicios/clientservicios.component';
import { ClientdescuentosComponent }          from './pages/clientdescuentos/clientdescuentos.component';
import { ClientbeneficiariosComponent }       from './pages/clientbeneficiarios/clientbeneficiarios.component';
import { GafasDestacadasComponent }           from './components/gafas-destacadas/gafas-destacadas.component';
import { MarcasComponent }                    from './components/marcas/marcas.component';
import { ClientMisCitasComponent }            from './pages/userLogged/client-mis-citas/client-mis-citas.component';
import { ClientMiSaludComponent }             from './pages/userLogged/client-mi-salud/client-mi-salud.component';


@NgModule({
  declarations: [
    ClienthomeComponent,
    ClientBodyComponent,
    ClientSettingsComponent,
    UserloggedBodyComponent,
    ClientcontactComponent,
    ClientnosotrosComponent,
    ClientpreguntasfrecuentesComponent,
    ClientgarantiasComponent,
    ClientserviciosComponent,
    ClientdescuentosComponent,
    ClientbeneficiariosComponent,
    GafasDestacadasComponent,
    MarcasComponent,
    ClientMisCitasComponent,
    ClientMiSaludComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClientRoutingModule,
    AngularPrimeNgModule,
    SharedModule
  ]
})
export class ClientModule { }
