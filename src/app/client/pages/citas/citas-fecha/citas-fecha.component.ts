import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-citas-fecha',
  templateUrl: './citas-fecha.component.html',
  styleUrls: ['./citas-fecha.component.css']
})
export class CitasFechaComponent implements OnInit {
  

  public fecha : Date = new Date;
 

  constructor(private _route : ActivatedRoute) { }

  ngOnInit(): void {
    console.log( this._route.snapshot.paramMap.get('tipo'));
  }


  fechaSeleccionada( fechaSelecciona: Date ){
    
    // console.log('selecciona', fechaSelecciona)
    
    
    fechaSelecciona.setHours(14,30)
    
    
    // console.log('selecciona y hora seleccionada', fechaSelecciona);
  }

}
