import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-client-mis-citas',
  templateUrl: './client-mis-citas.component.html',
  styleUrls: ['./client-mis-citas.component.css']
})
export class ClientMisCitasComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
  
  }

  logout(){
    this._authService.logout();
  }
}
