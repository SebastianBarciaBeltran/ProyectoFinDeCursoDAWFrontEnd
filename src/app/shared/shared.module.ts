import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularPrimeNgModule } from '../angular-prime-ng/angular-prime-ng.module';

import { AuthRoutingModule } from '../auth/auth-routing.module';
import { ClientRoutingModule } from '../client/client-routing.module';


import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    NewsletterComponent,
    NoPageFoundComponent
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    NoPageFoundComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class SharedModule { }
