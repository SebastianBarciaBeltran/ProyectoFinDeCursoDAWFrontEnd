import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';


import { loadUsers } from 'src/app/auth/interfaces/load-user.interfaces';

import { User } from 'src/app/auth/models/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';

const base_url = environment.base_url; //LO DECLARAMOS AQUI AFUERA PARA NO USAR EL THIS

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user !: User;
  
  constructor(private _http: HttpClient,
              private _router: Router,
              private _authService: AuthService
  ) {
    this.user = this._authService.user;
   }
  // --- GETTERS --- //
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string{
    return this.user.uid || '';
  }

  get headers(){
    return {
      headers: {
        'x-token' : this.token
      }
    }
  }
  
  loadAllUsers( from : number = 0){

    const url = `${ base_url }/users?from=${ from }`;

    return this._http.get<loadUsers>( url, this.headers )
               .pipe(
                //  delay(150), // para realentizar la peticion
                 map( resp => {
                   const users = resp.users.map(
                     user => new User(user.name, user.email,user.role, user.newsLetter, '', user.dateOfRegister, user.img, user.google, user.birthDate,user.phone,user.sexo,user.uid) )
                  return {
                    total: resp.total,
                    users
                  };
                 })
               );


  }
  
  updateUser( data: { name: string, email:string, birthDate:Date, sexo: string, phone: string, newsLetter : boolean, role: string }){
    console.log(this.uid);
    data = {
      ...data,
      role: this.user.role
    }
      
    return this._http.put(`${ base_url }/users/${ this.uid }`, data, this.headers);

  }

  deleteUser( user : User ){

    const url = `${ base_url }/users/${ user.uid }`;
    
    return this._http.delete( url, this.headers );

  }
  
  updataUserRole( user: User ){

     return this._http.put(`${ base_url }/users/${ user.uid }`, user , this.headers);
    
  }

}
