import {Component, HostListener, OnInit} from '@angular/core';
import {Message} from "../../core/model/Message";
import {AppdataService} from "../../services/appdata.service";
import {WebsocketService} from "../../services/websocket.service";
import {User} from "../../core/model/User";
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-rout',
  templateUrl: './rout.component.html',
  styleUrls: ['./rout.component.scss']
})
export class RoutComponent implements OnInit {

  users: User[] = new Array();
  message: string = '';
  publishedMessage: Message[] = [];
  showTypingIndicator: boolean = false;
  typingUser: string;
  loggedinUserId: number;
  websocket: WebSocket;

  heurs : Date = new Date();
  daysa : Date = new Date();

  constructor(private appDataService: AppdataService,
              private appService: AppService,
              private websocketService: WebsocketService) {

    this.websocket = this.websocketService.createNew();
    this.websocket.onopen = () => {
      let message: Message = {
        type: 'JOINED',
        from: this.appDataService.id,
        fromUserName: this.appDataService.displayName,
        message: ''
      };
      this.websocket.send(JSON.stringify(message));
    };
    this.initUserList();
    this.startListening2();


  }

  ngOnInit(): void {
    this.websocket = this.websocketService.createNew();
    this.loggedinUserId = this.appDataService.id;
    this.startListening();
  }



  startListening() {
    this.websocket.onmessage = (event: MessageEvent) => {
      let message: Message = JSON.parse(event.data);
      if (message.type == 'MESSAGE') {
        this.publishedMessage.push(message);
      } else if (message.type == 'TYPING') {
        if (message.from != this.loggedinUserId) {
          this.showUserTypingIndicator(message.fromUserName);
        }
      }
    };
  }

  sendMessage() {
    let msg = this.message;
    if (msg == '' || msg == undefined) return;

    let message: Message = {
      type: 'MESSAGE',
      from: this.appDataService.id,
      fromUserName: this.appDataService.displayName,
      message: msg
    };
    this.websocket.send(JSON.stringify(message));
    this.message = '';
  }

  sendTypeIndicator() {
    let message: Message = {
      type: 'TYPING',
      from: this.appDataService.id,
      fromUserName: this.appDataService.displayName,
      message: ''
    };
    this.websocket.send(JSON.stringify(message));
  }

  showUserTypingIndicator(userName: string) {
    this.typingUser = userName;
    this.showTypingIndicator = true;
    setTimeout(() => {
      this.hideUserTypingIndicator();
    }, 2000);
  }

  hideUserTypingIndicator() {
    if (this.showTypingIndicator) {
      this.showTypingIndicator = false;
    }
  }


  startListening2() {
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
