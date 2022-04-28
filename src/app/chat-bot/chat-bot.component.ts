import { Component, OnInit } from '@angular/core';
import * as SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";


@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss']
})
export class ChatBotComponent implements OnInit {
  title = 'WebSocketChatRoom';

  greetings: string[] = [];
  disabled = true;
  newmessage: string;
  stompClient :any = null;

  constructor(){}

  ngOnInit() {
    this.connect();
  }

  setConnected(connected: boolean) {
    this.disabled = !connected;

    if (connected) {
      this.greetings = [];
    }
  }

  connect() {
    const socket = new SockJS('http://localhost:8080/testchat');
    this.stompClient = Stomp.over(socket);

    const _this = this;
    this.stompClient.connect({}, function (frame:any) {
      console.log('Connected: ' + frame);

      _this.stompClient.subscribe('/start/initial', function (hello:any) {
        console.log(JSON.parse(hello.body));

        _this.showMessage(JSON.parse(hello.body));
      });
    });
  }

  sendMessage() {

    this.stompClient.send(
      '/current/resume',
      {},
      JSON.stringify(this.newmessage)
    );
    this.newmessage = "";

  }

  showMessage(message:any) {

    this.greetings.push(message);

  }

}
