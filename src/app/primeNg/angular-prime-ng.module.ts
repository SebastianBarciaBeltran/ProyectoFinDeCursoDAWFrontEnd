import { NgModule } from '@angular/core';

import { AccordionModule }     from 'primeng/accordion';
import { FieldsetModule }      from 'primeng/fieldset';
import { CarouselModule }      from 'primeng/carousel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule }        from 'primeng/dialog';
import { ToastModule  }        from 'primeng/toast';
import { BadgeModule }         from 'primeng/badge';

// PROVIDERS
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@NgModule({
  exports: [
    CarouselModule,
    AccordionModule,
    FieldsetModule,
    ConfirmDialogModule,
    DialogModule,  
    ToastModule,
    BadgeModule
  ],
  providers:[
    MessageService, ConfirmationService
  ]
})
export class AngularPrimeNgModule { }
