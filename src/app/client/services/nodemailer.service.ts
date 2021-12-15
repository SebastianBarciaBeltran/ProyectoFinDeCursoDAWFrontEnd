import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';


import { Contact, ContactResponse } from '../interfaces/contact.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class NodemailerService {

  constructor( private _http: HttpClient
  ) { }

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

}

