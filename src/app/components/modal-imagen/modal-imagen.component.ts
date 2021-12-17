import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from 'src/app/admin/services/modal-imagen.service';
import { FileUploadService } from 'src/app/services/file-upload.service';


@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir !: File;
  public imgTemp: any = null;


  constructor(public _modalImageService : ModalImagenService,
              private _fileUploadService: FileUploadService
    ) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imgTemp = null;
    this._modalImageService.cerrarModal();
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

    const id = this._modalImageService.id;
    const tipo = this._modalImageService.tipo;
    // this._fileUploadService.updateFoto( this.imagenSubir, 'users', this.user.uid || '' )
    // .then( img => console.log( img ) );
    this._fileUploadService.actualizarFoto( this.imagenSubir, tipo , id || '')
      .then( img => {
        // Swal.fire('Cambios Guardados', 'La imagen de perfil se ha actualizado correctamente', 'success');
        console.log('actualizada correctamente')
        this._modalImageService.nuevaImagen.emit(img);

        this.cerrarModal();
      }).catch( err => {
        console.log(err);
        console.log('¡Ups! Error al subir la imagen error');
      });
  }


}
