import { NgModule } from '@angular/core';

import { AccordionModule } from 'primeng/accordion';
import { FieldsetModule  } from 'primeng/fieldset';
import { CarouselModule  } from 'primeng/carousel';

@NgModule({
  exports: [
    AccordionModule,
    FieldsetModule,
    CarouselModule
  ],
})
export class AngularPrimeNgModule { }
