import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminBodyComponent } from './pages/admin-body/admin-body.component';
import { AdminhomeComponent } from './pages/adminhome/adminhome.component';
import { FullcalendarComponent } from './components/fullcalendar/fullcalendar.component';
import { AdminnavbarComponent } from './components/adminnavbar/adminnavbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminmarcasComponent } from './pages/adminmarcas/adminmarcas.component';

@NgModule({
  declarations: [
    AdminBodyComponent,
    AdminhomeComponent,
    FullcalendarComponent,
    AdminnavbarComponent,
    AdminmarcasComponent
  ],
  exports:[
    AdminBodyComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
