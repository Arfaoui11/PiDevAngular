import { Component, OnInit } from '@angular/core';
import {Formation} from "../core/model/Formation";
import {User} from "../core/model/User";
import {FormationService} from "../services/formation.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DomSanitizer} from "@angular/platform-browser";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {TokenService} from "../services/token.service";

@Component({
  selector: 'app-blog-formation',
  templateUrl: './blog-formation.component.html',
  styleUrls: ['./blog-formation.component.scss']
})
export class BlogFormationComponent implements OnInit {

  listFormation  : Formation[];
  toggle = true;
  domain : string;

  nbrlikes : number;
  nbrDislikes : number;

  listApprenent : User[];
  sowFormateur : boolean = false;
  page = 1;
  public Items: number;

  constructor(private serviceForm : FormationService,private snackbar:MatSnackBar  ,private http: HttpClient, private route:ActivatedRoute,private token: TokenService) { }

  ngOnInit(): void {

    // Methode  subscribe recuperer la liste de donnee .
    this.getAllFormation()
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


  affectationApptoFormation(idApp :number , idFor : number,f :Formation)
  {
    this.serviceForm.affectationApptoFormation(idApp, idFor, f).subscribe();
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


  addLikes(i:number)
  {
    this.serviceForm.addLikes(i).subscribe(
      data=>{
        this.getAllFormation();
      }
    );

    this.snackbar.open(' ajout Likes avec succees', '', {
      duration: 2000
    });
  }

  addDisLikes(i:number)
  {
    this.serviceForm.addDisLikes(i).subscribe(
      data=>{
        this.getAllFormation();
      }
    );

    this.snackbar.open(' ajout DisLikes avec succees', '', {
      duration: 2000
    });
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

}
