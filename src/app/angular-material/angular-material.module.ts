import { NgModule } from '@angular/core';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule }      from '@angular/material/icon';
import { MatTableModule }     from '@angular/material/table';

@NgModule({

  exports: [
    MatFormFieldModule,
    MatIconModule,
    MatTableModule
  ]
})
export class AngularMaterialModule { }
