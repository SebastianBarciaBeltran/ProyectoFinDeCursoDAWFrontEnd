import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';

import { SharedModule } from '../shared/shared.module';

import { ClienthomeComponent }     from './pages/clienthome/clienthome.component';
import { ClientBodyComponent }     from './pages/client-body/client-body.component';
import { UserloggedBodyComponent } from './pages/userLogged/userlogged-body/userlogged-body.component';
import { ClientSettingsComponent } from './pages/userLogged/client-settings/client-settings.component';
import { ClientcontactComponent } from './pages/clientcontact/clientcontact.component';
import { ReactiveFormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    ClienthomeComponent,
    ClientBodyComponent,
    ClientSettingsComponent,
    UserloggedBodyComponent,
    ClientcontactComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClientRoutingModule,
    SharedModule
  ]
})
export class ClientModule { }
