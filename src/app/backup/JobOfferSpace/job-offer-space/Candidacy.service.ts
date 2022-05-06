import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs';
import {FormGroup} from '@angular/forms';
import {Candidacy} from "../../core/model/Candidacy";



@Injectable({
  providedIn: 'root'
})
export class CandidacyService {
  getcURL = 'http://localhost:8090/GetCandidacy';
  supcUrl = 'http://localhost:8090//deleteCandidacy';
  addcUrl = 'http://localhost:8090/AddCandidacy';
  updatecUrl = 'http://localhost:8090/"/updateCandidacy"';
  public dataForm: FormGroup;
  constructor(private http: HttpClient) {  }
  RetrieveCandidacy(): Observable<Candidacy[]>{
    return this.http.get<Candidacy[]>(this.getcURL);
  }
  DeleteCandidacy(id: number) {

    return this.http.delete<Candidacy>(this.supcUrl + '/' + id);

  }


  consulterCandidacy(id: number): Observable<Candidacy> {
    const url = `${this.getcURL}/${id}`;
    return this.http.get<Candidacy>(url);
  }

  createData(formData: FormData): Observable<any> {
    return this.http.post(`${this.addcUrl}`, formData);
  }

  uploadFile(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', '<Server URL of the file upload>', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  addCandidacy( can: Candidacy): Observable<Candidacy>{
    return this.http.post<Candidacy>(this.addcUrl, can);
  }
  updateCandidacy(prod: Candidacy): Observable<Candidacy>
  {
    return this.http.put<Candidacy>(this.updatecUrl, prod);
  }
}
