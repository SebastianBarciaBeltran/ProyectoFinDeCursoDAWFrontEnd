import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'app-userlogged-body',
  templateUrl: './userlogged-body.component.html',
  styleUrls: ['./userlogged-body.component.css']
})
export class UserloggedBodyComponent implements OnInit {
 


  constructor( private _authService: AuthService

  ) { }

  ngOnInit(): void {
    
  }


  logout(){
    this._authService.logout();
  }

}
