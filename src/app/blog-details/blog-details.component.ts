import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {PostComment} from "../core/model/PostComment";
import {Formation} from "../core/model/Formation";
import {User} from "../core/model/User";
import {FormationService} from "../services/formation.service";
import {DomSanitizer} from "@angular/platform-browser";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {TokenService} from "../services/token.service";
import {Quiz} from "../core/model/Quiz";

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {

  public comment: Record<string, any>[];

  public listComment: Record<string, any>[];

  @Input() post : PostComment = new PostComment;

  rating: number;
  retrieveResonse : any;
  activeIndex = 0;
  index : number =0;
  public show : boolean = false ;
  day :Date = new Date();
  dataa :any;
  showC : boolean = false;
  videoUrl: any;
  public idFormation :number;
  toggle: boolean = true;
  formation : Formation;
  currentUser: any = [];
  ListQuiz : Quiz[];
  quiz :Quiz;

  public img: any;
  public pressure: any;
  public wind: any;
  public desc: any;
  public humidite: any;
  public lieu: any;
  public drizzle: any;
  public lat: any;
  public lot: any;
  public temp : any;

  public formateur :User;
  public retrieveFiles: any[]=[];
  public retrieveVideo: any[]=[];
  public retrieveImage: any[]=[];
  public go: boolean =false;
  public isTested: boolean =false;
  public listFormation: Formation;




  constructor(private serviceForm : FormationService,private sanitizer : DomSanitizer,private snackbar:MatSnackBar ,private http: HttpClient, private route:ActivatedRoute,private token: TokenService) {
    this.currentUser = this.token.getUser();

  }

  ngOnInit(): void {

    this.idFormation = this.route.snapshot.params['idCourses'];

    this.getFormation();

    setTimeout( () => {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.formation.lieu}&units=metric&appid=50a7aa80fa492fa92e874d23ad061374`)
        .then(response => response.json())
        .then(data => {
          var tempValue = data['main']['temp'];
          var drizzle = data['weather'][0]['main'];

          var name = data['name'];
          var pressure = data['main']['pressure'];
          var humidity = data['main']['humidity'];
          var descValue = data['weather'][0]['description'];
          var wind = data['wind']['speed'];
          this.img = data['weather'][0]['icon'];
          var lat = data['coord']['lat'];
          var lot = data['coord']['lon'];

          this.lat = lat;
          this.lot = lot;

          this.drizzle = drizzle;
          this.lieu = name;
          this.wind = wind;
          this.pressure += pressure;
          this.humidite = humidity;
          this.temp = tempValue.toFixed(1);

          this.desc = descValue;


        });
    },1000);





    setTimeout( () => {

      this.getCommentByFormation();


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


      for (let app of this.formation.apprenant)
      {
        if (app.id == this.currentUser.id)
        {
          this.show = true;
        }
      }
      for (let q of this.formation.quizzes)
      {
        let createAt = new Date(q.createAt);
        let today = new Date(Date.parse(Date()));
      if (createAt < today)
      {
        this.quiz = q;
        this.go = true;
      }
      }
      for (let res of this.quiz.results)
      {
        if (res.suser.id == this.currentUser.id )
        {
          this.isTested =true;
        }
      }
      this.rating = this.formation.rating;

    });
    return this.formation;
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
  public stat : boolean = true;

  LikesComment(id:number)
  {
    let status = true;
    for (let c of this.comment)
    {
      if (c.idComn == id)
      {
        for (let l of c.likes)
        {

          if(l.userL.id == this.currentUser.id)
          {
            status=false;
          }

        }

      }

    }


      if (status) {
        this.serviceForm.addLikes(id, this.currentUser.id).subscribe(data => {
            console.log(data);


            this.getCommentByFormation();

          }
        );
      }


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


  changeRating() {

    this.serviceForm.addRatingFormation(this.idFormation,this.rating).subscribe(
      data => {


        setTimeout(()=>
        {

         this.getFormation()

        },500);

      }
    )
  }

  DisLikesComment(id:number)
  {

    let status = true;
    for (let c of this.comment)
    {
      if (c.idComn == id)
      {
        for (let l of c.dislikes)
        {

          if(l.userL.id == this.currentUser.id)
          {
            status=false;
          }

        }

      }

    }
    if (status) {
      this.serviceForm.addDisLikes(id, this.currentUser.id).subscribe(data => {
        console.log(data);
        this.getCommentByFormation();
      });
    }
  }

  getFormateurByFormation(id:number)
  {
    this.serviceForm.getFormateurbyFormation(id).subscribe(
      (data:User)=>{this.formateur = data}
    );
    return this.formateur;
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

  assingAppToCourses() {
    this.serviceForm.affectationApptoFormation(this.currentUser.id,this.idFormation).subscribe(
      (data) => {console.log(data);
        this.snackbar.open(' This Courses Add To Yours List ', 'Undo', {
          duration: 2000
        });
        this.show = true;
      }
    )
  }
}
