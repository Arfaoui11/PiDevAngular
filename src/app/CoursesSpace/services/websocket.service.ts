import { Injectable } from '@angular/core';
const WEBSOCKET_URL = 'ws://localhost:8099/websocket';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  websocket: WebSocket;

  constructor() { }

  createNew(): WebSocket {
    this.websocket = new WebSocket(WEBSOCKET_URL);
    return this.websocket;
  }
}
