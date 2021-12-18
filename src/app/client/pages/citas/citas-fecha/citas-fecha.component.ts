import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-citas-fecha',
  templateUrl: './citas-fecha.component.html',
  styleUrls: ['./citas-fecha.component.css']
})
export class CitasFechaComponent implements OnInit {
  

  public hoy : Date = new Date;

  constructor(private _route : ActivatedRoute) { }

  ngOnInit(): void {
    console.log( this._route.snapshot.paramMap.get('tipo'))
  }

}
