import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';
import { FullcalendarComponent } from './fullcalendar/fullcalendar.component';

import { AngularPrimeNgModule } from '../primeNg/angular-prime-ng.module';

@NgModule({
  declarations: [ ModalImagenComponent, FullcalendarComponent ],
  imports: [
    CommonModule,
    AngularPrimeNgModule
  ],
  exports: [
    ModalImagenComponent,
    FullcalendarComponent
    
  ]
})
export class ComponentsModule { }
