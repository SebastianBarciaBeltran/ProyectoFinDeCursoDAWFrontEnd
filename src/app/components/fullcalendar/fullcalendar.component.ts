import { Component, OnInit } from '@angular/core';
// FULLCALENDAR
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Cita } from 'src/app/models/cita.model';
import { CitasService } from 'src/app/services/citas.service';
@Component({
  selector: 'app-fullcalendar',
  templateUrl: './fullcalendar.component.html',
  styleUrls: ['./fullcalendar.component.css']
})
export class FullcalendarComponent implements OnInit {
  
    public events: Cita[] = [];
    public options: any;

  constructor(private _citasServices : CitasService) { }
 


  ngOnInit(): void {
    this.getEvents();
    this.options = {
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
      defaultDate: new Date(),
      locale: 'es',
      header: {
                left: 'title', 
                center: '',
                right: 'today,prev,next,'
            },
        editable: true,
        selectable:true,
        selectMirror: true,
        dayMaxEvents: true
        
    }

  }


  getEvents(){
      this._citasServices.getCitas()
          .subscribe( resp => {
            this.events = resp;
          });
  }

}
