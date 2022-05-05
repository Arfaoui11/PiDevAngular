import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Formation} from "../../core/model/Formation";
import {User} from "../../core/model/User";
import {PostComment} from "../../core/model/PostComment";
import {Likes} from "../../core/model/likes";
import {DisLikes} from "../../core/model/DisLikes";
import {Quiz} from "../../core/model/Quiz";




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


  login(credentials:any): Observable<any> {
    return this.http.post('http://localhost:8099/api/auth/signin', {
      email: credentials.username,
      password: credentials.password
    }, httpOptions);
  }


  register(user:User): Observable<any> {
    return this.http.post('http://localhost:8099/api/auth/signup', {
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






  getFormateur():Observable<User[]>
  {
    return this.http.get<User[]>('http://localhost:8099/Courses/retrieveFormateur');
  }


  getFormateurRemunerationMaxSalaireTrie():Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8099/Courses/getFormateurMaxSalaireTrie');
  }


  getDataFormateur()
  {


    let xmll = new XMLHttpRequest();

    xmll.onreadystatechange = ()=>
    {
      this.event = JSON.parse(xmll.responseText)
    };


    xmll.open('get','http://localhost:8099/Courses/retrieveFormation',true);



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

    xx.open('get','http://localhost:8099/Courses/retrieveFormateur',true);


    xx.send(null);


    return this.formateur;

  }




  //////////////////// Formation ////////////////////////////////////////


  getCommentByFormation(idF : number): Observable<PostComment[]>
  {
    return this.http.get<PostComment[]>('http://localhost:8099/Courses/getCommentsByFormation/'+idF);
  }




  getAllComment(): Observable<PostComment[]>
  {
    return this.http.get<PostComment[]>('http://localhost:8099/Courses/getAllComments');
  }


  writeComment(mess :PostComment,idF :number , idU : number): Observable<number>
  {
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(mess);
    console.log(body);
    return this.http.post<number>("http://localhost:8099/Courses/addComments/"+idF+"/"+idU+"/",mess)
  }


  addFormation(f : Formation,i:number): Observable<Formation>
  {
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(f);
    console.log(body);
    return this.http.post<Formation>("http://localhost:8099/Courses/ajouterEtAffecterFormationAFormateur/"+i,f)
  }

  SerachMultiple(key:string) :Observable<Formation[]>
  {
    return this.http.get<Formation[]>('http://localhost:8099/Courses/SearchMultiple/'+key);
  }

  getFormateurbyFormation(id : number):Observable<User>
  {
    return this.http.get<User>('http://localhost:8099/Courses/getFormateurFromFormation/'+id);
  }


  SerachRepi(key : string):Observable<any>
  {
    return this.http.post<any>('http://localhost:8099/Courses/SearchHistorique/'+key,1)
  }


  getFormationByFormateur(id:number):Observable<Formation[]> {
    return this.http.get<Formation[]>('http://localhost:8099/Courses/getFormationByFormateur/'+id);
  }

  getFormationByApprenant(id:number):Observable<Formation[]> {
    return this.http.get<Formation[]>('http://localhost:8099/Courses/getFormationByApprenant/'+id);
  }

  getListQuizByUser(id : number,idf : number):Observable<any[]>
  {
    return this.http.get<any[]>('http://localhost:8099/Courses/listQuiqtestedbuUser/'+id+"/"+idf);
  }



  getFormation():Observable<Formation[]>
  {
    return this.http.get<Formation[]>("http://localhost:8099/Courses/retrieveFormation");
  }

  getPourcentage():Observable<Object[]>
  {
    return this.http.get<Object[]>("http://localhost:8099/Courses/getPourcentage");
  }

  getAllSearch():Observable<Object[]>
  {
    return this.http.get<Object[]>("http://localhost:8099/Courses/getAllSearch");
  }

  getFormationById(id:number):Observable<Formation> {
    return this.http.get<Formation>("http://localhost:8099/Courses/getFormationById/"+id);
  }

  getApprenantByFormation(i : number):Observable<User[]> {
    return this.http.get<User[]>("http://localhost:8099/Courses/ApprenantByFormation/"+i);
  }





 // http://localhost:8099/user/deleteUserById/7

  deleteFormation(i:number): Observable<any> {

    return this.http.get<number>("http://localhost:8099/Courses/deleteFormation/"+i)
  }

  deleteFormateur(i:number): Observable<any> {

    return this.http.get("http://localhost:8099/user/deleteUserById/"+i);
  }

  deleteFiles(i:string): Observable<any> {

    return this.http.get("http://localhost:8099/Courses/deleteFiles/"+i);
  }

  updateFormation(f:Formation,i:number): Observable<any>
  {
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(f);
    console.log(body);
    return this.http.put<Formation>
    ("http://localhost:8099/Courses/updateFormation/"+i,f);
  }

  affectationApptoFormation(idApp :number , idFor : number): Observable<any>
  {

    return this.http.post<any>("http://localhost:8099/Courses/affecterApprenantFormationWithMax/"+idApp+"/"+idFor,null);

  }

  getRevenueByFormation(i :number):Observable<number>
  {
    return  this.http.get<number>('http://localhost:8099/Courses/getRevenueByFormation/'+i)
  }

  getNbrApprenantByFormation():Observable<Object[]>
  {

    return this.http
      .get<Object[]>("http://localhost:8099/Courses/NbrApprenantByFormation")
  }

  addLikes(i:number,id:number): Observable<any> {
    return this.http.put<any>("http://localhost:8099/Courses/addLikes/"+i+"/"+id,null)
  }

  addDisLikes(i:number,id:number): Observable<any> {

    return this.http.put<any>("http://localhost:8099/Courses/addDisLikes/"+i+"/"+id,null)
  }

  desaffecterApprenant(idU:number,idF:number): Observable<any> {

    return this.http.post<any>("http://localhost:8099/Courses/desaffecterApprenant/"+idU+"/"+idF,null)
  }



  getNbrLikes(id:number):Observable<any>
  {
    return this.http.get<any>('http://localhost:8099/Courses/getNbrLikesByComment/'+id);
  }

  getNbrDisLikes(id:number):Observable<any>
  {
    return this.http.get<any>('http://localhost:8099/Courses/getNbrDislikesByComment/'+id);
  }

  addRatingFormation(idF:number,rate :number):Observable<any>
  {
    return this.http.put<any>("http://localhost:8099/Courses/FormationWIthRate/"+idF+"/"+rate,null)
  }


  uploadFile(file: FormData, i: number): Observable<any>
  {
    return this.http.post<any>('http://localhost:8099/Courses/uploadMultipleFiles/'+i,file);
  }

  getFile(file: string): Observable<any>
  {
    return this.http.get<any>('http://localhost:8099/Courses/get/'+file);
  }

  DownloadFile(file: string):Observable<Blob>
  {
    return this.http.get('http://localhost:8099/Courses/downloadFile/'+file,{responseType:'blob'});
  }


  getFilesFormation( i: number): Observable<any>
  {
    return this.http.get<any>('http://localhost:8099/Courses/getFiles/'+i);
  }





  exportPDF():Observable<Blob>
  {
    return this.http.get('http://localhost:8099/Courses/exportPDF',{responseType:'blob'} );
  }







}
