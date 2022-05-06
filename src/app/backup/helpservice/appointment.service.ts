import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Observable} from "rxjs";
import {Appointment} from "../../core/model/Appointment";
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  apiURL = "http://localhost:8090/heplpspace/retrieve-All-Appointment";
  getSingleSub = "http://localhost:8090/heplpspace/retrieve-Appointment-by-ID";
  addUrl = "http://localhost:8090/heplpspace/addRdv";
  supUrl = "http://localhost:8090/heplpspace/deleteAppointmentById";
  updateUrl = "http://localhost:8090/heplpspace/updaterdv";
  private getUrlexcel = 'http://localhost:8090/heplpspace/download/appointments.xlsx';

  constructor(private http:HttpClient) { }
  retrieveappointment(): Observable<Appointment[]>{
    return this.http.get<Appointment[]>(this.apiURL);
  }
  DeleteAppointment(id : number) {

    return this.http.delete<Appointment>(this.supUrl+"/"+id);
  }
  AddAppointment(appoin: Appointment):Observable<Appointment>{
    return this.http.post<Appointment>(this.addUrl, appoin, httpOptions);
  }
  consulterAppointment(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(this.getSingleSub+"/"+id);
  }


  updateAppointment(appoin :Appointment) : Observable<Appointment>{
    return this.http.put<Appointment>(this.updateUrl+"/"+appoin.idApp, appoin, httpOptions);
  }
  exportExcelAppointment(): Observable<Blob>{
    return this.http.get(`${this.getUrlexcel}`, {responseType: 'blob'});
  }
}
