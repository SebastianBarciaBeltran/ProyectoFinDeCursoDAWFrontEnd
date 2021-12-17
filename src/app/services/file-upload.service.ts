import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }
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

  async actualizarFoto(
    archivo: File,
    tipo: 'users'|'products'|'brands',
    id: string
  ) {

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
      } else {
        console.log(data.msg);
        return false;
      }

      
      console.log('data:', data);

      // console.log( resp );

      return 'nombre de la imagen'
      
    } catch (error) {
      console.log(error);
      return false;    
    }

  }



}
