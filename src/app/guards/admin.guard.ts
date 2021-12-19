import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private _authSerivice : AuthService,
              private _router : Router

  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      if (this._authSerivice.role == 'ADMIN_ROLE') {
          return true;
      } else{
          this._router.navigateByUrl('es')
          return false;
      }
      // console.log('adminGuard')
      // return (this._authSerivice.role == 'ADMIN_ROLE' ? true : false);

  }
  
}
