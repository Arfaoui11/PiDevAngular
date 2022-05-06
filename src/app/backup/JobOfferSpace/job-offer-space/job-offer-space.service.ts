import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable, observable} from 'rxjs';
import {Offer} from "../../../core/model/Offres";


const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class JobOfferSpaceService{


  getUrl = "http://localhost:8090/GetOffer";
  addUrl = "http://localhost:8090/AddOffer1"
  supUrl = "http://localhost:8090/deleteOffer";
  updateUrl = "http://localhost:8090/updateOffres";
  getOfferByDateCreation = "http://localhost:8090/getOffresByDateCreation/{d1}/{d2}";
  getByProfession= "http://localhost:8090//getCandidacyByProfession/{pro}"
  getNbrOffer="http://localhost:8090/nbroffer"
  constructor(private _http:HttpClient) { }

  addOffer( can: Offer): Observable<Offer>{
    return this._http.post<Offer>(this.addUrl, can);
  }

  DeleteOffer(id: number) {

    return this._http.delete<Offer>(this.supUrl + '/' + id);

  }


  updateOffres(offer: Offer, id: number) : Observable<Offer>{
    return this._http.put<Offer>(this.updateUrl+"/"+offer.idOffer, offer, httpOptions);
  }



  percentageByNumber(): Observable<any> {

    return this._http.get<number>(this.getNbrOffer);
  }

  getOffer(): Observable<Offer[]>{
    return this._http.get<Offer[]>(this.getUrl);
  }


  uploadFile(file: FormData, i: number): Observable<any>
  {
    return this._http.post<any>('http://localhost:8090/Courses/uploadMultipleFiles/'+i,file);
  }


  exportPDF():Observable<Blob>
  {
    return this._http.get('http://localhost:8090/Courses/exportPDF',{responseType:'blob'} );
  }


}
