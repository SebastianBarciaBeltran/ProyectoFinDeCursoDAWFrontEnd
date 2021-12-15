import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { environment } from 'src/environments/environment';

import { User } from '../models/user.model';

import { LoginForm } from '../interfaces/login-form.interfaces';
import { RegisterForm } from '../interfaces/register-form.interfaces';

const base_url = environment.base_url; //LO DECLARAMOS AQUI AFUERA PARA NO USAR EL THIS
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public auth2 : any;

  public user !: User;

  public isLogged : boolean = false;

  constructor(private _http: HttpClient, private _router: Router, private ngZone: NgZone) { }

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

  

  // --- FUNCTIONS --- // 

  googleInit(){

    return new Promise<void>( resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '830543192902-fgmdc7tkh7thuohmbl4ur144ev3vmcbj.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();

      });

    })

  }

  login( formData: LoginForm ){
    return this._http.post(`${ base_url }/login`, formData )
               .pipe(
                 tap( (resp : any) => {
                    localStorage.setItem('token', resp.token );
                    this.isLogged = true;
                 })
               );
  }

  loginGoogle( token: string  ){
    return this._http.post(`${ base_url }/login/google`, { token } )
               .pipe(
                 tap( (resp : any) => {
                   localStorage.setItem('token', resp.token );
                   this.isLogged = true;
                 })
               );
  }

  register( formData: RegisterForm ){
    return this._http.post(`${ base_url }/users`, formData )
               .pipe(
                  tap( (resp : any) => {
                    localStorage.setItem('token', resp.token );
                    
                  })
                );
  }

  validateToken(): Observable<boolean> {

    return this._http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
       map( (resp: any) => { 
        const { email, google, name, role, uid, birthDate, dateOfRegister, img, newsLetter, phone, sexo } = resp.user;
        // this.user = new User(name, email, role, newsLetter, '', dateOfRegister, img, google, '', '', '', uid );
        this.user = new User(name, email, role, newsLetter, '' , dateOfRegister, img, google, birthDate, phone, sexo, uid );
        localStorage.setItem('token', resp.token );
        this.isLogged = true;
        return true;
      }),
      catchError( err => of( false ))
    );


  }

  logout(){
    localStorage.removeItem('token');
    this.auth2.signOut().then( () => {
      this.ngZone.run(()=> {
        this._router.navigateByUrl('home');
      })
    });
    

  }

}
