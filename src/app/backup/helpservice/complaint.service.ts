import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Complaint} from "../../core/model/Complaint";

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  private apiURL = "http://localhost:8090/heplpspace/retrieve-All-Complaints";
  supUrl = "http://localhost:8090/heplpspace/deleteComplaintById";
  addUrl = "http://localhost:8090/heplpspace/AddComplaint";
  updateUrl = "http://localhost:8090/heplpspace/updatereclamation";
  getSingleCom="http://localhost:8090/heplpspace/retrieve-Complaint-by-ID"
  getUrl4 = 'http://localhost:8090/heplpspace/exportpdfComplaint';
  searchMul='http://localhost:8090/heplpspace/SearchMultiple'

  constructor(private http:HttpClient) { }
  RetrieveComplaint(): Observable<Complaint[]>{
    return this.http.get<Complaint[]>(this.apiURL);
  }
  DeleteComplaint(id : number) {

    return this.http.delete<Complaint>(this.supUrl+"/"+id);
  }
  AddComplaint(complaint: Complaint):Observable<Complaint>{
    return this.http.post<Complaint>(this.addUrl, complaint, httpOptions);
  }
  updateComplaint(complaint :Complaint) : Observable<Complaint>{
    return this.http.put<Complaint>(this.updateUrl+"/"+complaint.idCom, complaint, httpOptions);
  }
  exportPdfComplaint(): Observable<Blob>{
    return this.http.get(`${this.getUrl4}`, {responseType: 'blob'});
  }

  consulterComplaint(id: number) : Observable<Complaint> {
    return this.http.get<Complaint>(this.getSingleCom+"/"+id);
  }
  SearchMultiple(key:string) :Observable<Complaint[]>
  {
    return this.http.get<Complaint[]>(this.searchMul+"/"+key);
  }
}
