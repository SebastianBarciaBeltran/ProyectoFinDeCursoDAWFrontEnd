import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/models/user.model';

import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-client-mi-salud',
  templateUrl: './client-mi-salud.component.html',
  styleUrls: ['./client-mi-salud.component.css']
})
export class ClientMiSaludComponent implements OnInit {

  public user !: User;

  public notificaction : number = 3;
  public showNotificaction : boolean = true;
  public isAdmin = false;
  constructor(private _authService: AuthService) { 
    this.user   = _authService.user;
  }

  ngOnInit(): void {
    if (this.user.birthDate != undefined && this.user.sexo != undefined && this.user.phone != undefined) {
      this.showNotificaction = false;
    } else {
       this.showNotificaction = true;
    }

    
    if (this._authService.user.role == 'ADMIN_ROLE') {
      this.isAdmin = true;
    }
  }

  logout(){
    this._authService.logout();
  }

}
