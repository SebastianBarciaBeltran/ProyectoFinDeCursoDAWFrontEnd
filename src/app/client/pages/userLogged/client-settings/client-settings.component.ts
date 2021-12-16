import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ConfirmationService } from 'primeng/api';
import { MessageService }      from 'primeng/api';
import { ImagesService }       from 'src/app/services/images.service';
import { UserService }         from 'src/app/admin/services/user.service';
import { AuthService }         from 'src/app/auth/services/auth.service';

import { User } from 'src/app/auth/models/user.model';

@Component({
  selector: 'app-client-settings',
  templateUrl: './client-settings.component.html',
  styleUrls: ['./client-settings.component.css']
})
export class ClientSettingsComponent implements OnInit {

  formSubmitted : boolean = false;
  profileDialog : boolean = false;
  backendErrors : boolean = false;
  backendErrorMsg : string = '';
  public updateForm !: FormGroup;
  public user !: User;
  public usuarioActualizar !: User;
  public imagenSubir !: File;
  public imgTemp: any;
  public imgUrl = '';

  public notificaction : number = 3;
  public showNotificaction : boolean = true;


  constructor(private _userService: UserService,
              private _authService: AuthService,
              private fb: FormBuilder,
              private  _fileUploadService : ImagesService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService, 
  ) { 
    this.imgUrl = _authService.user.imageUrl;
    this.user   = _authService.user;

  }

  ngOnInit(): void {

    if (this.user.birthDate != undefined && this.user.sexo != undefined && this.user.phone != undefined) {
        this.showNotificaction = false;
    } 
    // DESGLOSAMOS EL BIRTHDATE PARA PODER MOSTRARLO EN EL INPUT
    // console.log(this.user.birthDate )
    // console.log('datebirth:', datebirth);
    let datebirth = this.user.birthDate?.split('T');
    datebirth?.splice(1);
    
    this.updateForm = this.fb.group({
      name                   : [ this.user.name , [Validators.required]],
      email                  : [ this.user.email, [Validators.required, Validators.email ]],
      birthDate              : [ datebirth, [Validators.required]],
      sexo                   : [ this.user.sexo, [Validators.required]],
      phone                  : [ this.user.phone, [Validators.required, Validators.minLength(9), Validators.maxLength(9) ]],
      newsLetter             : [ this.user.newsLetter ],
    });
  }

  updateUser(){
    this.formSubmitted = true;

    if ( this.updateForm.invalid ) {
      return ;
    } 

    this.usuarioActualizar = this.updateForm.value;
    this.usuarioActualizar.role = this.user.role;

    this.confirmationService.confirm({
      message: 'Nombre: ' + this.usuarioActualizar.name + ' Email: ' + 
      this.usuarioActualizar.email + ', Fecha de nacimiento: ' + this.usuarioActualizar.birthDate + ', Genero: ' + 
      this.usuarioActualizar.sexo  + ', Teléfono: ' + this.usuarioActualizar.phone  + ', Recbir newsletter: ' + (this.usuarioActualizar.newsLetter ? 'si' : 'no') + '.',
      header: 'Por favor, confirme los nuevos datos actualizar:',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._userService.updateUser(this.updateForm.value)
        .subscribe( (resp) => {
          this.backendErrors = false;
          this.showNotificaction = false;
          this.messageService.add({severity:'success', summary: 'Se ha actualizado tu perfil correctamente', life: 3000});
        }, (err) => {
          this.backendErrors = true;
          this.backendErrorMsg = err.error.msg;
        });     
      }
  });
    

  }

  cambiarImagen( file : File ){

    this.imagenSubir = file;

    if ( !file ) { 
      this.imgTemp = null; 
      return ; 
    }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
}

  subirImagen(){
    // this._fileUploadService.updateFoto( this.imagenSubir, 'users', this.user.uid || '' )
    // .then( img => console.log( img ) );
    this._fileUploadService.updateFoto( this.imagenSubir, 'users', this.user.uid || '')
      .then( img => {
        this.user.img = img;
        this.messageService.add({severity:'success', summary: 'La imagen de perfil se ha actualizado correctamente', life: 3000});
        // Swal.fire('Cambios Guardados', 'La imagen de perfil se ha actualizado correctamente', 'success');
      }).catch( err => {
        console.log(err);
        // Swal.fire('¡Ups!', 'Error al subir la imagen', 'error');
      });
  }

  // FUNCTION TO SHOW IF ERROR EXIST
  campoNovalido( campo: string ): boolean {
    if (this.updateForm.get(campo)?.invalid && this.formSubmitted ) {
      // SI EL FORMULARIO SE POSTEO Y EL CAMPO NO ES VALIDO MOSTRAMOS ERRO
        return true;  
    } else{
        return false;
    }
  }

   logout(){
    this._authService.logout();
  }

  

}
