import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Cita } from 'src/app/models/cita.model';
import { CitasService } from 'src/app/services/citas.service';

@Component({
  selector: 'app-citas-fecha',
  templateUrl: './citas-fecha.component.html',
  styleUrls: ['./citas-fecha.component.css']
})
export class CitasFechaComponent implements OnInit {
  
  horas : any[] = [];
  public mindate : Date = new Date;
  public tipo : string = this._route.snapshot.paramMap.get('tipo') || '';
  public today : Date = new Date;
  public horaSeleccionada : any;  
  
  
  submitted !: boolean;
  // form 
  public showInfo : boolean = true;
  public title !: string;
  public phone !: string;
  public color : string = '';
  
  constructor(private _route : ActivatedRoute,
              private _router : Router,
              private messageService: MessageService, 
              private confirmationService: ConfirmationService,
              private _citasService : CitasService
    ) { }

  ngOnInit(): void {
    
    if (this.tipo == 'vista') {
        this.color = "red";
    }else{
      this.color = "orange"
    }

    this.horas = [
      {hora: '10:00' },
      {hora: '10:30' },
      {hora: '11:00' },
      {hora: '12:00' },
      {hora: '12:30' },
      {hora: '13:00' },
      {hora: '17:00' },
      {hora: '17:30' },
      {hora: '18:00' },
      {hora: '18:30' },
      {hora: '19:00' },
      {hora: '19:30' },
   ];

 

  }

  

  pedirCita(){
    this.showInfo = false;
    this.submitted = true;

    let horaCortada = this.horaSeleccionada.split(':');
    let hora = horaCortada[0];
    let minutos = horaCortada[1]
    let fechaFormateado = new Date(this.today.setHours(hora,minutos));
  
    let fechaMongo = fechaFormateado.toISOString();
  

    const cita = new Cita(this.title, new Date(fechaMongo), this.color, this.tipo, this.phone); 

    if (this.title != undefined && this.phone != undefined) {
            this.confirmationService.confirm({ 
              message: `Comprueba los siguientes datos para confirmar su cita: Nombre: ${this.title }, Télefono: ${ this.phone}, tipo cita: ${ this.tipo }, día: ${this.today}, hora: ${ this.horaSeleccionada }`,
              header: 'Confirmación',
              icon: 'pi pi-exclamation-triangle',
              accept: () => {
                  this._citasService.setCita( cita )
                  .subscribe( (resp) => {
                    this.submitted = false;
                    this.messageService.add({severity:'success', summary: 'Cita añadida correctamente Correctamente' ,life: 3000});
                  });
                  this._router.navigateByUrl('/es/cita/servicio');
              }
            });      


    }

  }

  cancelar(){
    this.showInfo = true;
    this.submitted = false

    this._router.navigateByUrl('/es/cita/servicio');
  }







 

}

