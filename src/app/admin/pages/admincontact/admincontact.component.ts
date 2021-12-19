import { Component, OnInit } from '@angular/core';
import { NodemailerService } from 'src/app/client/services/nodemailer.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService }      from 'primeng/api';
import { Contact } from '../../models/contact.model';



@Component({
  selector: 'app-admincontact',
  templateUrl: './admincontact.component.html',
  styleUrls: ['./admincontact.component.css']
})
export class AdmincontactComponent implements OnInit {

  public contacts : Contact[] = [];
    // LOADING 
    public loading : boolean = true;

  constructor(private _contactService : NodemailerService,
    private messageService: MessageService, 
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(){
      this._contactService.getContacts()
          .subscribe( (resp) =>{
            this.contacts = resp;
            this.loading = false;
          });
  }

  deleteContact( contact : Contact ){
    this.confirmationService.confirm({
          message: 'Esta seguro que desea eliminarlo?',
          header: 'Confirmación',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this._contactService.deleteContact( contact )
          .subscribe( (resp) =>{
            this.messageService.add({severity:'success', summary: 'Eliminado Correctamente',life: 3000});
            this.getClientes();
          });
            
          }
      });
  }



}
