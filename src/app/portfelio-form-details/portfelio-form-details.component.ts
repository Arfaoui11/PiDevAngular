import {Component, Input, OnInit} from '@angular/core';
import {PostComment} from "../core/model/PostComment";
import {Formation} from "../core/model/Formation";
import {User} from "../core/model/User";
import {FormationService} from "../services/formation.service";
import {DomSanitizer} from "@angular/platform-browser";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {TokenService} from "../services/token.service";

@Component({
  selector: 'app-portfelio-form-details',
  templateUrl: './portfelio-form-details.component.html',
  styleUrls: ['./portfelio-form-details.component.scss']
})
export class PortfelioFormDetailsComponent implements OnInit {

  public comment: Record<string, any>[];

  public listComment: Record<string, any>[];

  @Input() post : PostComment = new PostComment;

  rating: number;
  retrieveResonse : any;
  activeIndex = 0;
  index : number =0;

  dataa :any;
  showC : boolean = false;
  videoUrl: any;
  public idFormation :number;
  toggle: boolean = false;
  formation : Formation;
  currentUser: any = [];
  public formateur :User;
  public retrieveFiles: any[]=[];
  public retrieveVideo: any[]=[];
  public retrieveImage: any[]=[];
  public listFormation: Formation;


  constructor(private serviceForm : FormationService,private sanitizer : DomSanitizer,private snackbar:MatSnackBar ,private http: HttpClient, private route:ActivatedRoute,private token: TokenService) {
    this.currentUser = this.token.getUser();
  }

  ngOnInit(): void {

    this.idFormation = this.route.snapshot.params['idCourses'];
    console.log(this.idFormation);
    this.getFormation();

    setTimeout( () => {




      this.rating = this.formation.rating;
    },2000);

    this.serviceForm.getFormationById(this.idFormation)
      .subscribe(
        data=> {

          this.listFormation =data;

          for (let l of this.listFormation.databaseFiles)
          {
            if(l.fileType.toString().includes('video'))
            {
              this.retrieveVideo.push(l)  ;
            }else if(l.fileType.toString().includes('application'))
            {
              this.retrieveFiles.push(l);
            }
            else if (l.fileType.toString().includes('image'))
            {
              this.retrieveImage.push(l) ;
            }
          }

        }
      );


  }

  getFormation()
  {
    this.serviceForm.getFormationById(this.idFormation).subscribe(data => {
      this.formation = data;
    });
    return this.formation;
  }


  playvideo( s :string) {
    this.serviceForm.DownloadFile(s).subscribe(
      x=>
      {
        const blob = new Blob([x],{type : 'video/mp4'});

        if(window.navigator && window.navigator.msSaveOrOpenBlob)
        {
          window.navigator.msSaveOrOpenBlob(blob);
          return;
        }

        const data = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = data;


        link.dispatchEvent( new MouseEvent('click',{bubbles:true,cancelable:true,view:window}))

        setTimeout(function () {
          window.URL.revokeObjectURL(data);
          link.remove();
        },1000)

      }
    )

  }

  downloadFiles( s :string) {
    this.serviceForm.DownloadFile(s).subscribe(
      x=>
      {
        const blob = new Blob([x],{type : 'video/mp4'});

        if(window.navigator && window.navigator.msSaveOrOpenBlob)
        {
          window.navigator.msSaveOrOpenBlob(blob);
          return;
        }

        const data = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = data;
        link.download = "video.mp4";

        link.dispatchEvent( new MouseEvent('click',{bubbles:true,cancelable:true,view:window}))

        setTimeout(function () {
          window.URL.revokeObjectURL(data);
          link.remove();
        },1000)

      }
    )

  }
  videoPlayerInit(data:any) {
    this.dataa = data;

    this.dataa.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.initVdo.bind(this));
    this.dataa.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
  }
  initVdo() {
    this.dataa.play();
  }

  nextVideo() {
    this.index++;

    if (this.index === this.retrieveResonse.length) {
      this.activeIndex = 0;
    }

    this.retrieveVideo = this.retrieveVideo[this.index];
  }

  sendIndex($index: number) {
    this.index =$index;
    this.retrieveVideo[this.index].play();
  }

}
