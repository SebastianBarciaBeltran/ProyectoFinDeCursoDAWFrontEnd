import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { Contact } from 'src/app/admin/models/contact.model';
import { environment } from 'src/environments/environment';


import { ContactResponse } from '../interfaces/contact.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class NodemailerService {

  constructor( private _http: HttpClient
  ) { }

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

  sendContactEmail( contact : Contact ){

    const url = `${ base_url }/contactMessage`;
    
    return this._http.post<ContactResponse>(url, contact)
           .pipe(
             map(
                resp => {
                  return resp.ok
                }),
                catchError( err => of(false) )
           );
  }


  getContacts(){
    const url = `${ base_url }/contactMessage`;

    return this._http.get<{ok: boolean, contacts: Contact[]}>(url, this.headers)
    .pipe(
      map( (resp: {ok:boolean, contacts: Contact[]}) => resp.contacts )
    );


  }


  deleteContact( contact: Contact  ){

    const url = `${ base_url }/contactMessage/${ contact._id }`;
    
    return this._http.delete(url, this.headers);
    
  }



}

