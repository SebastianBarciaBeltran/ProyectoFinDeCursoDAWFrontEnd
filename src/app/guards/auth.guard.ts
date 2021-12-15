import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { tap } from 'rxjs';


import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor(
    private _authService: AuthService,
    private _router : Router
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

     return this._authService.validateToken()
      .pipe(
        tap( estaAutenticado => {
              if ( !estaAutenticado ) {
                  this._router.navigateByUrl('home')
              }
        })
      );

  }
  
}
