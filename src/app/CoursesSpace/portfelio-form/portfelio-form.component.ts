import {Component, Input, OnInit} from '@angular/core';
import {FormationService} from "../services/formation.service";
import {DomSanitizer} from "@angular/platform-browser";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {TokenService} from "../services/token.service";
import {PostComment} from "../../core/model/PostComment";
import {Formation} from "../../core/model/Formation";
import {User} from "../../core/model/User";

@Component({
  selector: 'app-portfelio-form',
  templateUrl: './portfelio-form.component.html',
  styleUrls: ['./portfelio-form.component.scss']
})
export class PortfelioFormComponent implements OnInit {

  listFormation  : Formation[];
  toggle = true;
  domain : string;
  page = 1;

  nbrlikes : number;
  nbrDislikes : number;

  listApprenent : User[];
  sowFormateur : boolean = false;

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
      (data : Formation[]) => this.listFormation = data);
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


}
