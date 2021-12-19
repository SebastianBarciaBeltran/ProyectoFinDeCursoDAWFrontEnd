import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, delay, map, Observable, of, tap } from 'rxjs';

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

  public isLogged = new BehaviorSubject<boolean>(false); 


  constructor(private _http: HttpClient, private _router: Router, private ngZone: NgZone) { 
    this.googleInit();

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

  get role(): string{
      return this.user.role ;
  }

   getisLogged(): Observable<boolean> {

      return this.isLogged;

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
                 })
               );
  }

  loginGoogle( token: string  ){
    return this._http.post(`${ base_url }/login/google`, { token } )
               .pipe(
                 tap( (resp : any) => {
                   localStorage.setItem('token', resp.token );
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
     
        return true;
      }),
      catchError( err => of( false ))
    );


  }

  
  updateUser( data: { name: string, email:string, birthDate:Date, sexo: string, phone: string, newsLetter : boolean, role: string }){

    data = {
      ...data,
      role: this.user.role
    }
      
    return this._http.put(`${ base_url }/users/${ this.uid }`, data, this.headers);

  }

  logout(){
    localStorage.removeItem('token');
    this.isLogged.next(false);
    this.auth2.signOut().then( () => {
      this.ngZone.run(()=> {
        this._router.navigateByUrl('/es/customer/login');
      })
    });
    

  }

}
