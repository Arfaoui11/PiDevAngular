import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {FormationService} from "../services/formation.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {Formation} from "../../core/model/Formation";
import {User} from "../../core/model/User";
import {PostComment} from "../../core/model/PostComment";
import {TokenService} from "../services/token.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-videoplaylist',
  templateUrl: './videoplaylist.component.html',
  styleUrls: ['./videoplaylist.component.scss']
})
export class VideoplaylistComponent implements OnInit {

  @ViewChild('thenfirst', {static: true}) thenfirst: TemplateRef<any>|null = null;
  @ViewChild('thenSec', {static: true}) thenSec: TemplateRef<any>|null = null;

  public filePath :FileList;

  public comment: Record<string, any>[];

  public listComment: Record<string, any>[];

  @Input() post : PostComment = new PostComment;

  rating: number;
  retrieveResonse : any;

  public retrieveFiles: any[]=[];
  public retrieveVideo: any[]=[];
  public retrieveImage: any[]=[];

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


  public listFormation: Formation;
  PathURL: any;
  public List: Formation[];

  constructor(private serviceForm : FormationService,private sanitizer : DomSanitizer,private snackbar:MatSnackBar ,private http: HttpClient, private route:ActivatedRoute,private token: TokenService) {
    this.currentUser = this.token.getUser();
  }

  ngOnInit(): void {
    this.idFormation = this.route.snapshot.params['idCourses'];

  this.getFormation();
  this.getformationList();
  this.getData();

   // this.getFormation();

    setTimeout( () => {

      this.getCommentByFormation();


      this.rating = this.formation.rating;
    },2000);
  }

  getData()
  {
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


  uploadFile()
  {

    const formData = new FormData();

    for (let i = 0 ;i<this.filePath.length ; i++)
    {
      const element  =  this.filePath[i];

      formData.append('files',element);
    }


    this.serviceForm.uploadFile(formData,this.idFormation).subscribe(res => {
      console.log(res)
    });

    this.snackbar.open(' files add with succees', 'Undo', {
      duration: 2000
    });

  }


  onFileSelected(event : any) {

    const file : FileList = event?.target?.files;

    var reader = new FileReader();

    this.filePath = file;

    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      this.PathURL = reader.result;
    };
    const formData = new FormData();

    for (let i = 0 ;i<this.filePath.length ; i++)
    {
      const element  =  this.filePath[i];

      formData.append('files',element);
    }
    this.serviceForm.uploadFile(formData,this.idFormation).subscribe(res => {
      console.log(res);
      this.getData();

    });

    this.snackbar.open(' files add with succees', 'Undo', {
      duration: 2000
    });

    setTimeout(()=> {    window.location.reload(); },10000);

  }

  deleteFiles(id:string)
  {
    this.serviceForm.deleteFiles(id).subscribe(
      (data) =>{console.log(data);
        this.retrieveVideo = this.retrieveVideo.filter(item => item.id !== id);
       // this.getData();
    } );
    this.snackbar.open(' files delete with succees', 'Undo', {
      duration: 2000
    });
    setTimeout(()=> {    window.location.reload(); },5000);

  }


  getFormation()
  {

    this.serviceForm.getFormationById(this.idFormation).subscribe(data => {
      this.formation = data;
      this.rating = this.formation.rating;
    });
    return this.formation;
  }

  videoPlayerInit(data:any) {
    this.dataa = data;

    this.dataa.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.initVdo.bind(this));
    this.dataa.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
  }

  nextVideo() {
    this.activeIndex++;

    if (this.activeIndex === this.retrieveResonse.length) {
      this.activeIndex = 0;
    }

    this.videoUrl = this.retrieveResonse[this.activeIndex];
  }

  public status: number;
  sendComments()
  {
    this.serviceForm.writeComment(this.post,this.idFormation,this.currentUser.id).subscribe(
      data=>{
        this.getCommentByFormation();
        if(data==0)
        {
          this.snackbar.open( 'You Are create bad Comment in this Courses ', 'Undo', {
            duration: 2000
          });
        }else {
          this.snackbar.open(' Comment added ', 'Undo', {
            duration: 2000
          });
        }
      },

    );
  }

  getCommentByFormation()
  {




    this.serviceForm.getCommentByFormation(this.idFormation).subscribe(
      (data: PostComment[]) => {
        this.comment = data;
        for (let l of this.comment) {
          let xx = new XMLHttpRequest();
          let xmll = new XMLHttpRequest();

          let nbL=0;
          let nbD=0;
          xmll.onreadystatechange = ()=>
          {
            l.nbrDisLikes = JSON.parse(xmll.responseText)
          };
          xx.onreadystatechange = ()=>
          {
            l.nbrLikes = JSON.parse(xx.responseText)
          };

          xx.open('get','http://localhost:8099/Courses/getNbrLikesByComment/'+l.idComn,true);


          xx.send(null);


          xmll.open('get','http://localhost:8099/Courses/getNbrDislikesByComment/'+l.idComn,true);


          xmll.send(null);

        }

      }
    );
    return this.comment;
  }

  LikesComment(id:number)
  {



    this.serviceForm.addLikes(id,this.currentUser.id).subscribe(data=>
      {console.log(data);


        this.getCommentByFormation();
      }
    );

  }
  public nbrL : number=0;
  public nbrD:number=0;

  getnbrLikes(id:number)
  {

    this.serviceForm.getNbrLikes(id).subscribe(data =>
      this.nbrL = data);
    return this.nbrL;

  }

  getnbrDisLikes(id:number)
  {

    this.serviceForm.getNbrDisLikes(id).subscribe(data =>
      this.nbrD = data);
    return this.nbrD;

  }




  DisLikesComment(id:number)
  {


    this.serviceForm.addDisLikes(id,this.currentUser.id).subscribe(data=> {console.log(data);
      this.getCommentByFormation();
    });
  }

  getFormateurByFormation(id:number)
  {
    this.serviceForm.getFormateurbyFormation(id).subscribe(
      (data:User)=>{this.formateur = data}
    );
    return this.formateur;
  }

  initVdo() {
    this.dataa.pause();
  }

  startPlaylistVdo(item :any, index: number) {
    this.activeIndex = index;
    this.videoUrl = item;
  }















  playvideo( s :string) {
    this.serviceForm.DownloadFile(s).subscribe(
      x=>
      {
        const blob = new Blob([x],{type : 'video/mp4'})

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
        const blob = new Blob([x],{type : 'video/mp4'})

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
  sendIndex($index: number) {
    this.index =$index;
    this.retrieveVideo[this.index].play();
  }

  getformationList(){

    this.serviceForm.getFormationByFormateur(this.currentUser.id).subscribe(
      (data)=>{this.List = data});
    return this.listFormation;
  }

  previous() {
    if (this.index === 0) {
      this.index = 0;
    }else {
      this.index--;
    }
    this.retrieveVideo[this.index].play();

  }

  next() {
    if (this.index === this.retrieveImage.length) {
      this.index = 0;
    }else {
      this.index++;
    }
    this.retrieveVideo[this.index].play();
  }
  getF()
  {
    this.serviceForm.getFormationById(this.idFormation).subscribe(data => {
      this.formation = data;
    });
    return this.formation;
  }

  openPdf() {
    this.toggle= !this.toggle;
  }

  showComment() {
    this.showC = ! this.showC;
  }


  changeRating() {

    this.serviceForm.addRatingFormation(this.idFormation,this.rating).subscribe(
      data => {

        this.getFormation();

        //  this.rating = this.formation.rating;
      }
    )
  }
}
