import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {PartnerInstitution} from "../../../core/model/PartnerInstitution";


@Injectable({
  providedIn: 'root'
})
export class PartnerInstitutionService {
  private BaseUrl = 'http://localhost:8090/ExchangeStudentUniversity/getAllPartners';
  private getUrl = ' http://localhost:8090/ExchangeStudentUniversity/addPartner';
  private getUrl1 = 'http://localhost:8090/ExchangeStudentUniversity/getPartner';
  private getUrl2 = 'http://localhost:8090/ExchangeStudentUniversity/DeletePartner';
  private getUrl3 = 'http://localhost:8090/ExchangeStudentUniversity/updatePartnerInstitution/';
  private getUrl4 = 'http://localhost:8090/ExchangeStudentUniversity/exports/pdf';
  private getUrl5 = 'http://localhost:8090/ExchangeStudentUniversity/download/universities.xlsx';
  constructor(private httpClient: HttpClient) { }

  getPartnerList(): Observable<PartnerInstitution[]>{
    return this.httpClient.get<PartnerInstitution[]>(this.BaseUrl);

  }

  savePartner(partner: PartnerInstitution): Observable<PartnerInstitution>{
    return this.httpClient.post<PartnerInstitution>(this.getUrl, partner);
  }

  /*addUniversity(U : PartnerInstitution,i:number): Observable<PartnerInstitution>
  {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(U);
    console.log(body)
    return this.httpClient.post<PartnerInstitution>(" http://localhost:8090/ExchangeStudentUniversity/addPartner"+i,U)
  }*/

  getPartner(id: number): Observable<PartnerInstitution>{
    return this.httpClient.get<PartnerInstitution>(`${this.getUrl1}/${id}`);
  }

  deletePartner(id: number): Observable<string>{
    return this.httpClient.delete(`${this.getUrl2}/${id}`, {responseType: 'text'});
  }
  updatePartner(partner: PartnerInstitution,id : number): Observable<PartnerInstitution>{
    return this.httpClient.put<PartnerInstitution>(this.getUrl3+id, partner);
  }
  exportPdfUniversity(): Observable<Blob>{
    return this.httpClient.get(`${this.getUrl4}`, {responseType: 'blob'});
  }

  exportExcelUniversity(): Observable<Blob>{
    return this.httpClient.get(`${this.getUrl5}`, {responseType: 'blob'});
  }

  SerachMultiple(key:string) :Observable<PartnerInstitution[]>
  {
    return this.httpClient.get<PartnerInstitution[]>('http://localhost:8090/ExchangeStudentUniversity/SearchMulti/'+key);
  }

   updateUniversityyy(university: PartnerInstitution): Observable<PartnerInstitution> {
    return this.httpClient.put<PartnerInstitution>('http://localhost:8090/ExchangeStudentUniversity/update', university);
  }

  editUniversity(u:PartnerInstitution,i:number): Observable<any>
  {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(u);
    console.log(body)
    return this.httpClient.put<PartnerInstitution>
    ("http://localhost:8090/ExchangeStudentUniversity/Edituniversity/"+i,u);
  }











}

