import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cita } from '../models/cita.model';


const base_url = environment.base_url; 

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  constructor(private _http: HttpClient) { }

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


  getCitas(){

    const url = `${ base_url }/citas`

    return this._http.get<{ok: boolean, citas: Cita[]}>(url)
               .pipe(
                 map( (resp: {ok:boolean, citas: Cita[]}) => resp.citas )
               );

  }

  setCita( cita : Cita, ){
    const url = `${ base_url }/citas`;

    return this._http.post<{ok: boolean, cita: Cita }>( url, cita)
    .pipe(
      map( (resp: {ok: boolean, cita: Cita }) => resp.cita)
    );
  }

  deleteCita( cita: Cita ){

    const url = `${ base_url }/citas/${ cita._id }`;
    
    return this._http.delete(url, this.headers);
    
  }
  

}
