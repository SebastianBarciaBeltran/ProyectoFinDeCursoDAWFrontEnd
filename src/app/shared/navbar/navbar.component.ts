import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    isLogged : boolean = false;
    
    
  constructor(public _authService : AuthService) { }

  ngOnInit(): void {
    this.isLogged = this._authService.isLogged;
  }

}
