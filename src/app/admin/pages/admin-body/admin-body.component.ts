import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-admin-body',
  templateUrl: './admin-body.component.html',
  styleUrls: ['./admin-body.component.css']
})
export class AdminBodyComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
  }


  logout(){
    this._authService.logout();
  }
  
}
