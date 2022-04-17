import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Formation} from "../core/model/Formation";
import {User} from "../core/model/User";




export interface IPagedResponse {
  total: number;
  data: User[];
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  constructor(private http : HttpClient) { }

  public event :[];
  public formateur :[];

  public  field : {[key : string]:any};




  register(user:User): Observable<any> {
    return this.http.post('http://localhost:8090/api/auth/signup', {
      displayName: user.displayName,
      email: user.email,
      password: user.password,
      matchingPassword: user.password,
      phoneNumber : user.phoneNumber,
      tarifHoraire : user.tarifHoraire,
      profession : user.profession,
      age:user.age,
      socialProvider: 'LOCAL'
    }, httpOptions);
  }






  getFormateur():Observable<User[]> {
    return this.http.get<User[]>("http://localhost:8090/Courses/retrieveFormateur");
  }


  getFormateurRemunerationMaxSalaireTrie():Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8090/Courses/getFormateurMaxSalaireTrie');
  }


  getDataFormateur()
  {


    let xmll = new XMLHttpRequest();

    xmll.onreadystatechange = ()=>
    {
      this.event = JSON.parse(xmll.responseText)
    };


    xmll.open('get','http://localhost:8090/Courses/retrieveFormation',true);



    xmll.send(null);
    return this.event;

  }


  getDataFormation()
  {

    let xx = new XMLHttpRequest();
    xx.onreadystatechange = ()=>
    {
      this.formateur = JSON.parse(xx.responseText)
    };

    xx.open('get','http://localhost:8090/Courses/retrieveFormateur',true);


    xx.send(null);


    return this.formateur;

  }




  //////////////////// Formation ////////////////////////////////////////




  SerachMultiple(key:string) :Observable<Formation[]>
  {
    return this.http.get<Formation[]>('http://localhost:8090/Courses/SearchMultiple/'+key);
  }

  getFormateurbyFormation(id : number):Observable<User>
  {
    return this.http.get<User>('http://localhost:8090/Courses/getFormateurFromFormation/'+id);
  }


  SerachRepi(key : string):Observable<any>
  {
    return this.http.post<string>("http://localhost:8090/Courses/SearchHistorique/"+key,1)
  }


  getFormation():Observable<Formation[]> {
    return this.http.get<Formation[]>("http://localhost:8090/Courses/retrieveFormation");
  }

  getFormationById(id:number):Observable<Formation> {
    return this.http.get<Formation>("http://localhost:8090/Courses/getFormationById/"+id);
  }

  getApprenantByFormation(i : number):Observable<User[]> {
    return this.http.get<User[]>("http://localhost:8090/Courses/ApprenantByFormation/"+i);
  }



  addFormation(f : Formation,i:number): Observable<Formation>
  {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(f);
    console.log(body)
    return this.http.post<Formation>("http://localhost:8090/Courses/ajouterEtAffecterFormationAFormateur/"+i,f)
  }

  deleteFormation(i:number): Observable<any> {

    return this.http.get<number>("http://localhost:8090/Courses/deleteFormation/"+i)
  }
  updateFormation(f:Formation,i:number): Observable<any>
  {
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(f);
    console.log(body);
    return this.http.put<Formation>
    ("http://localhost:8090/Courses/updateFormation/"+i,f);
  }

  affectationApptoFormation(idApp :number , idFor : number,f :Formation): Observable<any>
  {
    const headers = { 'content-type': 'application/json'};
    return this.http.post<Formation>("http://localhost:8090/Courses/affecterApprenantFormation/"+idApp+"/"+idFor+"/",f );

  }

  getRevenueByFormation(i :number):Observable<number>
  {
    return  this.http.get<number>('http://localhost:8090/Courses/getRevenueByFormation/'+i)
  }

  getNbrApprenantByFormation():Observable<Object[]>
  {

    return this.http
      .get<Object[]>("http://localhost:8090/Courses/NbrApprenantByFormation")
  }

  addLikes(i:number): Observable<any> {

    return this.http.post<number>("http://localhost:8090/Courses/addLikes/"+i,1)
  }

  addDisLikes(i:number): Observable<any> {

    return this.http.post<number>("http://localhost:8090/Courses/addDisLikes/"+i,1)
  }


  uploadFile(file: FormData, i: number): Observable<any>
  {
    return this.http.post<any>('http://localhost:8090/Courses/uploadMultipleFiles/'+i,file);
  }

  getFile(file: string): Observable<any>
  {
    return this.http.get<any>('http://localhost:8090/Courses/get/'+file);
  }

  DownloadFile(file: string):Observable<Blob>
  {
    return this.http.get('http://localhost:8090/Courses/downloadFile/'+file,{responseType:'blob'});
  }


  getFilesFormation( i: number): Observable<any>
  {
    return this.http.get<any>('http://localhost:8090/Courses/getFiles/'+i);
  }





  exportPDF():Observable<Blob>
  {
    return this.http.get('http://localhost:8090/Courses/exportPDF',{responseType:'blob'} );
  }





}
