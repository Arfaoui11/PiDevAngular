import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {FormationService} from "../services/formation.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {Formation} from "../core/model/Formation";
import {User} from "../core/model/User";
import {PostComment} from "../core/model/PostComment";
import {TokenService} from "../services/token.service";

@Component({
  selector: 'app-videoplaylist',
  templateUrl: './videoplaylist.component.html',
  styleUrls: ['./videoplaylist.component.scss']
})
export class VideoplaylistComponent implements OnInit {

  videoItems = [
    {
      name: 'First Video',
      src: 'data:video/mpeg;base64/Users/macos/Downloads/tn.mp4',
      type: 'video/mp4'
    },
    {
      name: 'Second Video',
      src: 'http://static.videogular.com/assets/videos/videogular.mp4',
      type: 'video/mp4'
    }
  ];

  public comment: Record<string, any>[];

  public listComment: Record<string, any>[];

  @Input() post : PostComment = new PostComment;


  retrieveResonse : any;
  activeIndex = 0;
  index : number =1;
  currentVideo = this.videoItems[this.activeIndex];
  dataa :any;
  showC : boolean = false;
   videoUrl: any;
  public idFormation :number;
   toggle: boolean = false;
  formation : Formation;
  currentUser: any = [];
  public formateur :User;

  constructor(private serviceForm : FormationService,private sanitizer : DomSanitizer,private http: HttpClient, private route:ActivatedRoute,private token: TokenService) {
    this.currentUser = this.token.getUser();
  }

  ngOnInit(): void {
    this.idFormation = this.route.snapshot.params['idCourses'];
   // this.serviceForm.getFilesFormation(this.idFormation)
    //  .subscribe(
     // data=> {
      //  this.retrieveResonse=data
      //}
   // );

    this.serviceForm.getFormationById(this.idFormation).subscribe(data => {
      this.formation = data;
    });

    this. getCommentByFormation();



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

  sendComment()
  {
    this.serviceForm.writeComment(this.post,this.idFormation,this.currentUser.id).subscribe(
      data=>{
        this.getCommentByFormation();
      }
    );
  }

  getCommentByFormation()
  {
    this.serviceForm.getAllComment().subscribe(
      (data: PostComment[]) => {
        this.comment = data;
        for (let l of this.comment) {
          l.nbrLikes = this.getnbrLikes(l.idComn);
          l.nbrDisLikes = this.getnbrDisLikes(l.idComn);
        }

      }
    );
    return this.comment;
  }

  LikesComment(id:number)
  {



    this.serviceForm.addLikes(id).subscribe(data=>
    {console.log(data);

   /* for (let l of this.comment)
    {
      if(l.idComn === id)
      {
        l.nbrLikes =this.getnbrLikes(id);
      }
    }*/
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


    this.serviceForm.addDisLikes(id).subscribe(data=> {console.log(data);

     /* for (let l of this.comment)
      {
        if(l.idComn === id)
        {
          l.nbrDisLikes =this.getnbrDisLikes(id);
        }
      }*/
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
    this.dataa.play();
  }

  startPlaylistVdo(item :any, index: number) {
    this.activeIndex = index;
    this.videoUrl = item;
  }

  retrievedImage: any;
  base64Data: any;

   video: any;

  getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.serviceForm.getFilesFormation(this.idFormation)
      .subscribe(
        async res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse;

          this.videoUrl = 'data:video/mp4;base64,'+this.base64Data;

        }
      );
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


  fileReady(e:any) {
    const file: File = e[0];
    const fileReader = new FileReader();
    fileReader.onloadend = (event: any) => {
      const arrayBuffer = event.target.result;
      const fileType = "video/mp4";
      const blob = new Blob(arrayBuffer, {type: fileType });
      const src = URL.createObjectURL(blob);
      this.video = src;
    };
    fileReader.readAsArrayBuffer(file);
  }

  previous() {
    if (this.index === 0) {
      this.index = 0;
    }else {
      this.index--;
    }

  }

  next() {
    if (this.index === this.retrieveResonse.length) {
      this.index = 0;
    }else {
      this.index++;
    }
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




 }
