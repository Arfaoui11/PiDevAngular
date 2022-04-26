import { Injectable } from '@angular/core';
import {XhrhandlerService} from "./xhrhandler.service";
import {LoginRequest} from "../core/model/LoginRequest";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private xhrhandler: XhrhandlerService) { }

  userLogin(request: LoginRequest): Observable<any> {
    return this.xhrhandler.doPost('user/login', request);
  }

  listUser(): Observable<any> {
    return this.xhrhandler.doGet('user/list');
  }
}
