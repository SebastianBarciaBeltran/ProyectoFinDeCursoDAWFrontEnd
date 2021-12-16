import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';


const base_url: string = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor( private _http: HttpClient ) { }

    // --- GETTERS --- //

  /**
   * OBTENEMOS EL TOKEN 
   */
   get token(): string {
    return localStorage.getItem('token') || '';
  }

  /**
   * OBTENEMOS EL HEADER PARA USAR EL TOKEN
   */
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  async updateFoto (
    archivo: File,
    tipo : 'users'|'products'|'brands',
    id: string
  ){

    try {

      const url = `${ base_url }/uploads/${ tipo }/${ id }`;
      const formData = new FormData();

      formData.append('img', archivo);

      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': this.token
        },
        body: formData
      });

      const data = await resp.json();

      if ( data.ok ) {
          return data.nombreArchivo;
      } else{
        console.log(data.msg);
        return false;
      }

      console.log('data:', data);

      return 'nombre de la imagen'

    } catch (error) {
      console.log(error);
      return false
    }


  }


}
