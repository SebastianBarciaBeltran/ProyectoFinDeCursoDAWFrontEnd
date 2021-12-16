import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-client-mi-salud',
  templateUrl: './client-mi-salud.component.html',
  styleUrls: ['./client-mi-salud.component.css']
})
export class ClientMiSaludComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
  }

  logout(){
    this._authService.logout();
  }

}
