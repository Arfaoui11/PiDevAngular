import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Formation} from "../core/model/Formation";
import {User} from "../core/model/User";
import {FormationService} from "../services/formation.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {TokenService} from "../services/token.service";

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit {

  listFormation  : Formation[];
  toggle = true;
  domain : string;

  @ViewChild('first', {static: true}) thenfirst: TemplateRef<any>|null = null;
  @ViewChild('Sec', {static: true}) thenSec: TemplateRef<any>|null = null;
  currentUser: any = [];
  listApprenent : User[];
  sowFormateur : boolean = false;
  page = 1;
  public Items: number;

  constructor(private serviceForm : FormationService,private snackbar:MatSnackBar  ,private http: HttpClient, private route:ActivatedRoute,private token: TokenService) {
    this.currentUser = this.token.getUser();
  }

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
    return  this.serviceForm.getFormationByApprenant(this.currentUser.id).subscribe(
      (data : Formation[]) => {this.listFormation = data;
        this.Items = this.listFormation.length;
      });
  }





  affectationApptoFormation(idApp :number , idFor : number)
  {
    this.serviceForm.affectationApptoFormation(idApp, idFor).subscribe();
    this.snackbar.open(' ajoute avec succees ', 'Back', {
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
