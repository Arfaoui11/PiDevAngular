import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {User} from "../core/model/User";
import {FormationService} from "../services/formation.service";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {
  public idUser: any;
  public user :User;
  public listFomateur: User[];
  public formateur: Record<string, any>[];



  constructor(private serviceForm : FormationService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.idUser = this.route.snapshot.params['idUser'];
    this.serviceForm.getFormateur().subscribe((data:User[]) =>{ this.listFomateur = data;
      for (let u of this.listFomateur)
      {
        if(u.id == this.idUser)
        {
          this.user = u;
        }
      }
    });



  }


  deleteFormateur(id:number)
  {
    this.serviceForm.deleteFormateur(id).subscribe(data => {
      console.log(data);

    });
    window.location.href = '#/home/Formation-management/Courses';
  }

  getFormateur()
  {
    this.serviceForm.getFormateur().subscribe(
      (data: User[]) => {this.formateur = data;
      });

  }

}
