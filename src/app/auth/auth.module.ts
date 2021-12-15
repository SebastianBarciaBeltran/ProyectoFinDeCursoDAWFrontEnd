import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { LoginComponent }    from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthBodyComponent } from './pages/auth-body/auth-body.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthBodyComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
