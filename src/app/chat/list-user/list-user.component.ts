import {Component, HostListener, OnInit} from '@angular/core';
import {User} from "../../core/model/User";
import {AppService} from "../../services/app.service";
import {AppdataService} from "../../services/appdata.service";
import {WebsocketService} from "../../services/websocket.service";
import {Message} from "../../core/model/Message";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  users: User[] = new Array();
  websocket: WebSocket;

  constructor(private appService: AppService,
              private appDataService: AppdataService,
              private websocketService: WebsocketService) {

    this.websocket = this.websocketService.createNew();
    this.websocket.onopen = () => {
      let message: Message = {
        type: 'JOINED',
        from: this.appDataService.id,
        fromUserName: this.appDataService.displayName,
        message: ""
      }
      this.websocket.send(JSON.stringify(message));
    }
    this.initUserList();
    this.startListening();
  }

  ngOnInit(): void {
  }


  startListening() {
    this.websocket.onmessage = (event: MessageEvent) => {
      let message: Message = JSON.parse(event.data);
      if (message.type == 'JOINED') {
        this.setUserStatus(message.from, true);
      } else if (message.type == 'LEFT') {
        this.setUserStatus(message.from, false);
      }
    }
  }

  initUserList() {
    this.appService.listUser().subscribe(response => {
      this.users = response;
      this.setEachUserOnlineOffline();
    });
  }

  setEachUserOnlineOffline() {
    this.users.forEach(user => user.isOnline = false);
  }

  setUserStatus(userId: Number, isOnline: boolean) {
   // let user: User = this.users.filter(u => u.id == userId );
   // user.isOnline = isOnline;
  }

  @HostListener('window:beforeunload')
  close() {
    let message: Message = {
      type: 'LEFT',
      from: this.appDataService.id,
      fromUserName: this.appDataService.displayName,
      message: ""
    }
    this.websocket.send(JSON.stringify(message));
  }

}
