import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Formation} from "../core/model/Formation";
import {User} from "../core/model/User";
import {Info} from "../core/model/Info";
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';



export interface IPagedResponse {
  total: number;
  data: User[];
}

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  constructor(private http : HttpClient) { }

  public event :[];
  public formateur :[];

  public  field : {[key : string]:any};









  getFormateur():Observable<User[]> {
    return this.http.get<User[]>("http://localhost:8090/SpringMVC/form/retrieveFormateur");
  }


  getFormateurRemunerationMaxSalaireTrie():Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8090/SpringMVC/form/getFormateurMaxSalaireTrie');
  }


  getDataFormateur()
  {


    let xmll = new XMLHttpRequest();

    xmll.onreadystatechange = ()=>
    {
      this.event = JSON.parse(xmll.responseText)
    }


    xmll.open('get','http://localhost:8090/SpringMVC/form/retrieveFormation',true)


    xmll.send(null)

  }


  getDataFormation()
  {

    let xx = new XMLHttpRequest();
    xx.onreadystatechange = ()=>
    {
      this.formateur = JSON.parse(xx.responseText)
    }

    xx.open('get','http://localhost:8090/SpringMVC/form/retrieveFormateur',true)


    xx.send(null)




  }




  //////////////////// Formation ////////////////////////////////////////




  SerachMultiple(key:string):Observable<Formation[]>
  {
    return this.http.get<Formation[]>('http://localhost:8090/SpringMVC/form/SearchMultiple/'+key);
  }


  SerachRepi(key : string):Observable<any>
  {
    return this.http.post<string>("http://localhost:8090/SpringMVC/form/SearchHistorique/"+key,1)
  }


  getFormation():Observable<Formation[]> {
    return this.http.get<Formation[]>("http://localhost:8090/SpringMVC/form/retrieveFormation");
  }


  getApprenantByFormation(i : number):Observable<User[]> {
    return this.http.get<User[]>("http://localhost:8090/SpringMVC/form/ApprenantByFormation/"+i);
  }



  addFormation(f : Formation,i:number): Observable<any>
  {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(f);
    console.log(body)
    return this.http.post<Formation>("http://localhost:8090/SpringMVC/form/ajouterEtAffecterFormationAFormateur/"+i,f)
  }

  deleteFormation(i:number): Observable<any> {

    return this.http.get<number>("http://localhost:8090/SpringMVC/form/deleteFormation/"+i)
  }
  updateFormation(f:Formation,i:number): Observable<any>
  {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(f);
    console.log(body)
    return this.http.put<Formation>
    ("http://localhost:8090/SpringMVC/form/updateFormation/"+i,f);
  }

  affectationApptoFormation(idApp :number , idFor : number,f :Formation): Observable<any>
  {
    const headers = { 'content-type': 'application/json'};
    return this.http.post<Formation>("http://localhost:8090/SpringMVC/form/affecterApprenantFormation/"+idApp+"/"+idFor+"/",f );

  }

  getRevenueByFormation(i :number):Observable<number>
  {
    return  this.http.get<number>('http://localhost:8090/SpringMVC/form/getRevenueByFormation/'+i)
  }

  getNbrApprenantByFormation():Observable<Object[]>
  {

    return this.http
      .get<Object[]>("http://localhost:8090/SpringMVC/form/NbrApprenantByFormation")
  }

  addLikes(i:number): Observable<any> {

    return this.http.post<number>("http://localhost:8090/SpringMVC/form/addLikes/"+i,1)
  }

  addDisLikes(i:number): Observable<any> {

    return this.http.post<number>("http://localhost:8090/SpringMVC/form/addDisLikes/"+i,1)
  }


  uploadFile(file: FormData, i: number): Observable<any>
  {
    return this.http.post<any>('http://localhost:8090/SpringMVC/form/uploadMultipleFiles/'+i,file);
  }


  exportPDF():Observable<Blob>
  {
    return this.http.get('http://localhost:8090/SpringMVC/form/exportPDF',{responseType:'blob'} );
  }





}
