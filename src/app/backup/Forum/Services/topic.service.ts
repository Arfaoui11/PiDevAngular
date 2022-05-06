import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Topic} from "../../../core/model/Topic";
import {User} from "../../../core/model/User";



export interface IPagedResponse {
  total: number;
  data: User[];
}

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  apiURL = "http://localhost:8099/Topic/getAllTopics";
 // getSingleSub = "http://localhost:8090/heplpspace/retrieve-Appointment-by-ID";
  //addUrl = "http://localhost:8090/heplpspace/addRdvAndAssignMedAndPatient";
  supUrl = "http://localhost:8099/Topic/deleteTopic";
  //updateUrl = "http://localhost:8090/heplpspace/updateApppointmentById";
  //private getUrlexcel = 'http://localhost:8090/heplpspace/download/appointments.xlsx';

  constructor(private http:HttpClient) { }

  retrievetopic(): Observable<Topic[]>{
    return this.http.get<Topic[]>(this.apiURL);
  }


  deleteTopic(i:number): Observable<any> {

    return this.http.get<number>("http://localhost:8099/Topic/deleteTopic/"+i)
  }

}
