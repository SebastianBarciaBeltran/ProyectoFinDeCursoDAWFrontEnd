import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule   }  from './admin-routing.module';
import { SharedModule }          from '../shared/shared.module';
import { PipesModule }           from '../pipes/pipes.module';
import { AngularPrimeNgModule }  from '../primeNg/angular-prime-ng.module';

import { AdminBodyComponent }    from './pages/admin-body/admin-body.component';
import { AdminhomeComponent }    from './pages/adminhome/adminhome.component';
import { FullcalendarComponent } from './components/fullcalendar/fullcalendar.component';
import { AdminnavbarComponent }  from './components/adminnavbar/adminnavbar.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AdminmarcasComponent }  from './pages/adminmarcas/adminmarcas.component';
import { ComponentsModule } from '../components/components.module';
import { AdminclientesComponent } from './pages/adminclientes/adminclientes.component';
import { AdminproductosComponent } from './pages/adminproductos/adminproductos.component';

@NgModule({
  declarations: [
    AdminBodyComponent,
    AdminhomeComponent,
    FullcalendarComponent,
    AdminnavbarComponent,
    AdminmarcasComponent,
    AdminclientesComponent,
    AdminproductosComponent
  ],
  exports:[
    AdminBodyComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AngularPrimeNgModule,
    PipesModule,
    ComponentsModule
  ]
})
export class AdminModule { }
