import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/models/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'app-userlogged-body',
  templateUrl: './userlogged-body.component.html',
  styleUrls: ['./userlogged-body.component.css']
})
export class UserloggedBodyComponent implements OnInit {
 
  public user !: User;

  public notificaction : number = 3;
  public showNotificaction : boolean = true;
  public isAdmin = false;
  
  constructor( private _authService: AuthService,
               private _router : Router
    ) {
    }
    
    ngOnInit(): void {
        this.user   = this._authService.user;
      if (this.user.birthDate != undefined && this.user.sexo != undefined && this.user.phone != undefined) {
        this.showNotificaction = false;
      } else {
         this.showNotificaction = true;
      }

    // if (this._authService.user.role == 'ADMIN_ROLE') {
    //   this.isAdmin = true;
    //   this._router.navigateByUrl('/dashboard');
    // }

    if (this._authService.user.role == 'ADMIN_ROLE') {
        this.isAdmin = true;
    }
    
  }


  logout(){
    this._authService.logout();
  }

}
