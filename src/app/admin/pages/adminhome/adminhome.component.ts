import { Component, OnInit } from '@angular/core';
import { Cita } from 'src/app/models/cita.model';
import { CitasService } from 'src/app/services/citas.service';

import { ConfirmationService } from 'primeng/api';
import { MessageService }      from 'primeng/api';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {

  // LOADING 
  public loading : boolean = true;
  citas : Cita[] = [];

  constructor(private _citasServices : CitasService,
    private messageService: MessageService, 
    private confirmationService: ConfirmationService
    ) { }

  ngOnInit(): void {

    this.getCitas();

  }
  
  getCitas(){
    this._citasServices.getCitas()
        .subscribe( resp => {
          this.loading = false;
          this.citas =  resp;
        });
  }

  deleteCita( cita : Cita){
    this.confirmationService.confirm({
      message: 'Esta seguro que desea eliminar La cita de ' + cita.title + '?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this._citasServices.deleteCita( cita )
          .subscribe( (resp) => {
            this.getCitas();

            this.messageService.add({severity:'success', summary: 'Eliminado Correctamente',life: 3000});
          });
      }
  });
  }

}
