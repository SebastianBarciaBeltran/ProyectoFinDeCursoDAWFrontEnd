import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { User } from 'src/app/auth/models/user.model';
import { environment } from 'src/environments/environment';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class NewslletterService {

  constructor(private _http: HttpClient ) { }

  
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


  getUsers(){

    const url = `${ base_url }/newsletter/users`;

    return this._http.get<{ok: boolean, users: User[]}>( url, this.headers )
               .pipe(
                 map( (resp: {ok: boolean, users: User[]}) => resp.users )
               );

  }


  
  getClients(){

    const url = `${ base_url }/newsletter/clients`;

    return this._http.get<{ok: boolean, clients: any[]}>( url, this.headers )
               .pipe(
                 map( (resp: {ok: boolean, clients: any[]}) => resp.clients )
               );

  }


  setNewsLetter( email : string ){

    const url = `${ base_url }/newsletter`;

    return this._http.post(url, email, this.headers);

  }

}
