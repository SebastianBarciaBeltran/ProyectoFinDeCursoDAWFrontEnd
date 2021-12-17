import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/models/user.model';

import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-client-mis-citas',
  templateUrl: './client-mis-citas.component.html',
  styleUrls: ['./client-mis-citas.component.css']
})
export class ClientMisCitasComponent implements OnInit {

  public user !: User;

  public notificaction : number = 3;
  public showNotificaction : boolean = true;
  
  constructor(private _authService: AuthService) { 
    this.user   = _authService.user;
  }

  ngOnInit(): void {
    if (this.user.birthDate != undefined && this.user.sexo != undefined && this.user.phone != undefined) {
      this.showNotificaction = false;
    } else {
       this.showNotificaction = true;
    }
  }

  logout(){
    this._authService.logout();
  }
}
