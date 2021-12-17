import { Component, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';

import { User } from 'src/app/auth/models/user.model';

import { ModalImagenService } from '../../services/modal-imagen.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService }      from 'primeng/api';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-adminclientes',
  templateUrl: './adminclientes.component.html',
  styleUrls: ['./adminclientes.component.css']
})
export class AdminclientesComponent implements OnInit {

    // LOADING 
    public loading : boolean = true;
    // LISTA DE USUARIOS 
    public users : User[] = [];
    public usersTemp : User[] = [];
    public imgSubs !: Subscription;



  constructor(private _userService: UserService, 
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private _modalImageService: ModalImagenService
  ) { }

  ngOnInit(): void {
    this.getAllUsers();

    this.imgSubs = this._modalImageService.nuevaImagen
        .pipe(delay(100)).subscribe(img => this.getAllUsers() );

  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  getAllUsers(){
    this.loading = true;
    this._userService.loadAllUsers()
        .subscribe( ({ total, users }) => {

            if (users.length !== 0) {
              this.users = users;
              this.usersTemp = users;
              this.loading = false;
            }
            // console.log(users);
        });
  }

  changeRole( user : User ){

    this._userService.updataUserRole( user )
        .subscribe( resp => {
          this.messageService.add({severity:'success', summary: 'Successful', detail: `El rol del usuario: ${user.name} ha sido modificado` , life: 3000});
    
        }); 
  }

  deleteUser( user : User ){
    this.confirmationService.confirm({
      message: 'Esta seguro que desea eliminar el usuario: ' + user.name + '?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this._userService.deleteUser( user )
          .subscribe( (resp) => {
            this.getAllUsers();
            this.messageService.add({severity:'success', summary: 'Eliminado Correctamente', detail: ` el usuario: ${user.name} ` ,life: 3000});
          });
      }
  });
  }

  guardarCambios( user : User ){

  }

  abrirModal( user : User) {
    // console.log('user:', user);
    this._modalImageService.abrirModal('users', user.uid || '', user.img );
}



}
