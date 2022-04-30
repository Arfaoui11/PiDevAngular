import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {User} from "../core/model/User";
import {FormationService} from "../services/formation.service";
import {Formation} from "../core/model/Formation";
import {MatSnackBar} from "@angular/material/snack-bar";

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

  @Input() fr:Formation=new Formation;

  constructor(private serviceForm : FormationService, private route:ActivatedRoute,private snackbar:MatSnackBar) { }

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

  addFormation()
  {
    this.serviceForm.addFormation(this.fr,this.idUser).subscribe(
      data=>{
        console.log(data);
      });
/*
    const formData = new FormData();

    for (let i = 0 ;i<this.imagePath.length ; i++)
    {
      const element  =  this.imagePath[i];

      formData.append('files',element);
    }


    this.serviceForm.uploadFile(formData,1).subscribe(res => {
      console.log(res)
    });
*/
    this.snackbar.open(' ajout avec succees', 'Undo', {
      duration: 2000
    });


  }



  deleteFormateur()
  {
    this.serviceForm.deleteFormateur(this.idUser).subscribe(data => {
      console.log(data);

    });

    setTimeout( () => {
      window.location.href = '#/home/Formation-management/Courses';
    },500);
    }

  getFormateur()
  {
    this.serviceForm.getFormateur().subscribe(
      (data: User[]) => {this.formateur = data;
      });

  }

}
