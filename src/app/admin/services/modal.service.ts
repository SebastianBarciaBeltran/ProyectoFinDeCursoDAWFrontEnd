import { EventEmitter,Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalService {


  private _ocultarModal: boolean = true;


  public tipo !: 'users'|'brands'|'products'|'blogs';
  public id   !: string;
  public img  !: string;

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal(){
    return this._ocultarModal;
  }

 constructor() { }

 abrirModal(tipo : 'users'|'brands'|'products'|'blogs', id: string, img = 'noImage'){
  this._ocultarModal = false;

  this.tipo = tipo || '';
  this.id = id || '';
  this.img = img; 

  if ( img?.includes('https') ) {
      this.img = img;
  } else  {
    this.img = `${ base_url }/uploads/${ tipo }/${ img }`
  }

}

cerrarModal(){
  this._ocultarModal = true;
}




}
