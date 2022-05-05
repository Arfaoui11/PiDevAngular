import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { IMsg, IMsgType } from 'models/IMessage.js';
import { IPeerJs } from 'models/peerJS.js';
import { from, Subject } from 'rxjs';
import { mergeMap, takeUntil, tap } from 'rxjs/operators';
import { WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';
import {ActivatedRoute} from "@angular/router";
import {TokenService} from "../services/token.service";


@Component({
  selector: 'app-call-video',
  templateUrl: './call-video.component.html',
  styleUrls: ['./call-video.component.scss']
})
export class CallVideoComponent implements OnInit {

  title = 'frontend';
  msg: string = '';
  messages: IMsg[] = [];
  end$ = new Subject();
  socket = new WebSocketSubject<IMsg>(environment.url);
  _room = '';
  currentUser: any = [];
  room = '';
  _name: string = '';
  name: string = '';
  localStream!: MediaStream;
  remoteStreams: MediaStream[] = [];
  myPeer!: IPeerJs;
  peers: {
    [id: string]: any;
  } = {};
  id: string = '';
  remoteNames: string[] = [];
  public idFormation :number;


  constructor(private cdr: ChangeDetectorRef,private token: TokenService, private route:ActivatedRoute) {
    this.currentUser = this.token.getUser();

  }
  ngOnInit(): void {

    this.idFormation = this.route.snapshot.params['idCourses'];

    this.socket.pipe(takeUntil(this.end$)).subscribe(
      (m) => {
        switch (m.type) {
          case 'connection':
            if (m.message === 'Welcome') {
              this.id = m.id;
            }
            break;
          case 'message':
            this.messages.push(m);
            break;
          case 'available':
            const call = this.myPeer.call(m.id, this.localStream);
            this.connectToNewUser(call);
            break;
          case 'leave':
            this.peers[m.id]?.close();
            break;
        }
      },
      (err) => {
        console.error(err);
        this.name = '';
        this.room = '';
      },
      () => console.info('CLOSED')
    );
  }

  setName() {
    if (this.currentUser.displayName) {
      this.name = this.currentUser.displayName;
      this.sendMessage(this.name, 'connection');
    }
  }

  initVideo() {
    from(navigator.mediaDevices.getUserMedia({ audio: false, video: true }))
      .pipe(
        tap((stream) => (this.localStream = stream)),
        mergeMap(() =>
          // @ts-ignore
          from(import('../../../assets/peer.js'))
        )
      )
      .pipe(takeUntil(this.end$))
      .subscribe((data) => {
        this.myPeer = new data.default(this.name) as IPeerJs;
        this.myPeer.on('open', (id) => {
          console.log(id);
        });
        this.myPeer.on('call', (call) => {
          call.answer(this.localStream);
          this.connectToNewUser(call);
        });
      });
  }

  startCall() {
    this.sendMessage(this.name, 'available');
  }

  sendMessage(message: string, type: IMsgType = 'message') {
    this.socket.next({ type, id: this.room, message });
    this.msg = '';
  }
  setRoom() {
    if (this.idFormation) {
      this.room = this.idFormation.toString();
      this.sendMessage(this.room, 'join');
      this.initVideo();
    }
  }

  connectToNewUser(call: any) {
    console.log(call.peer);
    call.on('stream', (stream: MediaStream) => {
      this.remoteStreams.push(stream);
      this.peers[call.peer] = call;
      this.remoteNames = Object.keys(this.peers);
      console.log(this.remoteNames);
    });
    call.on('close', () => {
      this.peers[call.peer].close();

    });

    console.log(this.peers);
  }

  ngOnDestroy() {
    this.end$.next(1);
  }

  desconnect() {
    window.location.href = '../homeF';
    this.ngOnDestroy();
  }


}
