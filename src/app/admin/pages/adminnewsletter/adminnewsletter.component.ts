import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/models/user.model';

import { NewslletterService } from '../../services/newslletter.service';

@Component({
  selector: 'app-adminnewsletter',
  templateUrl: './adminnewsletter.component.html',
  styleUrls: ['./adminnewsletter.component.css']
})
export class AdminnewsletterComponent implements OnInit {

  public users   : User[] = [];
  public clients : any[] = [];

  constructor(private _newsLetterServices: NewslletterService) { }

  ngOnInit(): void {
    this.getUsers();
    this.getClients();
  }

  getUsers(){
      this._newsLetterServices.getUsers()
          .subscribe( resp => {
            this.users = resp;
          })
  }
  getClients(){
      this._newsLetterServices.getClients()
          .subscribe( resp => {
            this.clients = resp;
          })
  }

}
