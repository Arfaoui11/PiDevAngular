import { Component, OnInit } from '@angular/core';
import {Message} from "../../core/model/Message";
import {AppdataService} from "../../services/appdata.service";
import {WebsocketService} from "../../services/websocket.service";

@Component({
  selector: 'app-chatstream',
  templateUrl: './chatstream.component.html',
  styleUrls: ['./chatstream.component.scss']
})
export class ChatstreamComponent implements OnInit {


  message: string = '';
  publishedMessage: Message[] = [];
  showTypingIndicator: boolean = false;
  typingUser: string;
  loggedinUserId: number;
  websocket: WebSocket;

  constructor(private appDataService: AppdataService,
              private websocketService: WebsocketService) {

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

}
