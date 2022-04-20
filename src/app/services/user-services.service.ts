import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get('http://localhost:8090/api/all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get('http://localhost:8090/api/user', { responseType: 'text' });
  }



  getAdminBoard(): Observable<any> {
    return this.http.get('http://localhost:8090/api/admin', { responseType: 'text' });
  }

  getCurrentUser(): Observable<any> {
    return this.http.get('http://localhost:8090/api/user/me', httpOptions);
  }
}
