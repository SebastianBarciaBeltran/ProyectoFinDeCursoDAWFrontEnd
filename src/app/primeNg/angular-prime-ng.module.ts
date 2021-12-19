import { NgModule } from '@angular/core';

import { AccordionModule }     from 'primeng/accordion';
import { FieldsetModule }      from 'primeng/fieldset';
import { CarouselModule }      from 'primeng/carousel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule }        from 'primeng/dialog';
import { ToastModule  }        from 'primeng/toast';
import { BadgeModule }         from 'primeng/badge';
import { ButtonModule        } from 'primeng/button';
// import { FullCalendarModule  } from 'primeng/fullcalendar';
import { TableModule         } from 'primeng/table';
import { CalendarModule      } from 'primeng/calendar';
import { SliderModule        } from 'primeng/slider';
import { MultiSelectModule   } from 'primeng/multiselect';
import { ContextMenuModule   } from 'primeng/contextmenu';
import { DropdownModule      } from 'primeng/dropdown';
import { ProgressBarModule   } from 'primeng/progressbar';
import { InputTextModule     } from 'primeng/inputtext';
import { FileUploadModule    } from 'primeng/fileupload';
import { ToolbarModule       } from 'primeng/toolbar';
import { RatingModule        } from 'primeng/rating';
import { RadioButtonModule   } from 'primeng/radiobutton';
import { InputNumberModule   } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PaginatorModule     } from 'primeng/paginator';
import { ColorPickerModule   } from 'primeng/colorpicker';
import { FullCalendarModule } from 'primeng/fullcalendar';

import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
// PROVIDERS
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@NgModule({
  exports: [
    ButtonModule,
    CarouselModule,
    // FullCalendarModule,
    TableModule,
    ToastModule,
    CalendarModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    DialogModule,
    DropdownModule,
    ProgressBarModule,
    InputTextModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    PaginatorModule,
    ColorPickerModule,
    BadgeModule,
    FieldsetModule,
    AccordionModule,
    FullCalendarModule,
    MessagesModule,
    MessageModule
  ],
  providers:[
    MessageService, ConfirmationService
  ]
})
export class AngularPrimeNgModule { }
