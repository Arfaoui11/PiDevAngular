import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../services/token.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  currentUser: any = [];

  constructor(private token: TokenService) {

    this.currentUser = this.token.getUser();
  }

  ngOnInit(): void {
  }

  private doLogout() {

  }

}
