import { Component, OnInit } from '@angular/core';
// FULLCALENDAR
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { FECHAS } from 'src/assets/data';


@Component({
  selector: 'app-fullcalendar',
  templateUrl: './fullcalendar.component.html',
  styleUrls: ['./fullcalendar.component.css']
})
export class FullcalendarComponent implements OnInit {
    infoJSON = FECHAS;

    public show: boolean = false;


    public events: any[] = [];
    public options: any;

    public result : any;
    public date : any;
  constructor() { }
 


  ngOnInit(): void {
    this.date = new Date();
    console.log('date normal',  this.date);

    this.result =  this.date.toISOString();
    console.log('toISOString', this.result)

    
    this.options = {
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
      defaultDate: new Date(),
      locale: 'es',
      header: {
                // left: 'title', 
                // center: '',
                // right: 'today,prev,next,'
                left: 'prev,next',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
        editable: false,
        selectable:true,
        selectMirror: true,
        dayMaxEvents: true
    }

    this.events = [
      {
        title: "Sebastian - cita vista",
        start: new Date( this.result )
      },
      {
        title: "Date()",
        start: this.date,
        description: "Evento 2",
      },
      {
        // title: "Evento3",
        // start: new Date(new Date().getTime() + (86400000 * 2) ),
        // description: "Evento 3",
      },
    ];

  }

  
  getCitas(){
      
    
  }

}
