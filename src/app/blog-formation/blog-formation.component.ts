import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Formation} from "../core/model/Formation";
import {User} from "../core/model/User";
import {FormationService} from "../services/formation.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DomSanitizer} from "@angular/platform-browser";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {TokenService} from "../services/token.service";
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels} from "ngx-qrcode2";

@Component({
  selector: 'app-blog-formation',
  templateUrl: './blog-formation.component.html',
  styleUrls: ['./blog-formation.component.scss']
})
export class BlogFormationComponent implements OnInit {

  listFormation  : Formation[];
  toggle = true;
  domain : string;

  elementType= NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.MEDIUM;

  @ViewChild('thenfirst', {static: true}) thenfirst: TemplateRef<any>|null = null;
  @ViewChild('thenSec', {static: true}) thenSec: TemplateRef<any>|null = null;

  listApprenent : User[];
  sowFormateur : boolean = false;
  page = 1;
  public Items: number;

  constructor(private serviceForm : FormationService,private snackbar:MatSnackBar  ,private http: HttpClient, private route:ActivatedRoute,private token: TokenService) { }

  ngOnInit(): void {

    // Methode  subscribe recuperer la liste de donnee .
    this.getAllFormation();
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getAllFormation();
  }


  getAllFormation()
  {
    return  this.serviceForm.getFormation().subscribe(
      (data : Formation[]) => {this.listFormation = data;
        this.Items = this.listFormation.length;
      });
  }


  ToggleForm()
  {
    this.sowFormateur = ! this.sowFormateur;
  }


  enableDisableRule() {
    this.toggle = !this.toggle;
  }


  affectationApptoFormation(idApp :number , idFor : number)
  {
    this.serviceForm.affectationApptoFormation(idApp, idFor).subscribe();
    this.snackbar.open(' ajout avec succees ', 'Back', {
      duration: 2000
    });
  }


  getApprenantByFormation(i : number)
  {
    this.serviceForm.getApprenantByFormation(i).subscribe(
      (data:User[])=>{this.listApprenent = data});
    return this.listApprenent;
  }







  SearchMultiple(key:string): void
  {
    if (key=='') {
      this.getAllFormation()
    }
    else if (key!=null)
    {
      this.serviceForm.SerachMultiple(key).subscribe(
        (data:Formation[]) => {
          this.listFormation =data
        }
      );
    }

  }

  SearchHistoric(value: any) {
    if (value=='') {
      this.getAllFormation()
    }
    else if (value!=null)
    {
      this.serviceForm.SerachRepi(value).subscribe(
        data => console.log(data)

      );
    }
  }
}
