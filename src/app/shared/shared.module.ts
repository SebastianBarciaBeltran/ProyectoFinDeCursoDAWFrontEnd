import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from '../auth/auth-routing.module';


import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { LoadingComponent } from './components/loading/loading.component';
import { AngularPrimeNgModule } from '../primeNg/angular-prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    NewsletterComponent,
    NoPageFoundComponent,
    LoadingComponent
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    NoPageFoundComponent,
    LoadingComponent,
    NewsletterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    AngularPrimeNgModule
  ]
})
export class SharedModule { }
