import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-client-settings',
  templateUrl: './client-settings.component.html',
  styleUrls: ['./client-settings.component.css']
})
export class ClientSettingsComponent implements OnInit {

  constructor(private _authService: AuthService

  ) { }

  ngOnInit(): void {
  }



  cambiarImagen() {

  }

  subirImagen(){
    
  }



  logout(){

  }

}
