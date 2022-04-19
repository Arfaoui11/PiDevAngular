import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {FormationService} from "../services/formation.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {Formation} from "../core/model/Formation";
import {User} from "../core/model/User";

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
  retrieveResonse : any;
  activeIndex = 0;
  index : number =1;
  currentVideo = this.videoItems[this.activeIndex];
  dataa :any;

   videoUrl: any;
  public idFormation :number;
   toggle: boolean = false;
  formation : Formation;
  public formateur :User;

  constructor(private serviceForm : FormationService,private sanitizer : DomSanitizer,private http: HttpClient, private route:ActivatedRoute) {
    //this.getImage();
    //this.getF();
  }

  ngOnInit(): void {
    this.idFormation = this.route.snapshot.params['idCourses'];
    this.serviceForm.getFilesFormation(this.idFormation)
      .subscribe(
      data=> {
        this.retrieveResonse=data
      }
    );

    this.serviceForm.getFormationById(this.idFormation).subscribe(data => {
      this.formation = data;
    });

    for(let l in this.retrieveResonse)
    {
        this.index = l.length;

    }

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
          let blob = new Blob([res.data], { 'type' : 'video/mp4;' });
         // let videoURL = window.URL.createObjectURL(blob);
         // const blobF = await fetch(videoURL).then(res => res.blob());
          const data = window.URL.createObjectURL(blob);

          const link = document.createElement('video');


          link.setAttribute("src",data);

          link.dispatchEvent( new MouseEvent('click',{bubbles:true,cancelable:true,view:window}))


         const url = URL.createObjectURL(blob);
          this.videoUrl = this.sanitizer.bypassSecurityTrustUrl(url);

        //  this.onSelectedFile(res.data);

          this.retrievedImage =  this.base64Data;
        }
      );
  }





  onSelectedFile() {


    this.serviceForm.getFilesFormation(1)
      .subscribe(
         res => {
           const blob = new Blob(res.data,{type : 'video/mp4'});
           var data = window.URL.createObjectURL(blob);
         //  const link = document.createElement('button');
          // link.href = data;
         // let file = res.target.files[0];
          var URL = window.URL;
          this.videoUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data));
          console.log(this.videoUrl)

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
}
