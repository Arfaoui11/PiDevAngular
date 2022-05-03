import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TokenService} from "../../services/token.service";
import {Formation} from "../../core/model/Formation";
import {FormationService} from "../../services/formation.service";

@Component({
  selector: 'app-home-f',
  templateUrl: './home-f.component.html',
  styleUrls: ['./home-f.component.scss']
})
export class HomeFComponent implements OnInit {

  currentUser: any = [];
  public img: any;
  public pressure: any;
  public wind: any;
  public desc: any;
  public humidite: any;
  public lieu: any;
  public drizzle: any;
  public lat: any;
  public lot: any;
  public index= 0;

  @ViewChild('thenfirst', {static: true}) thenfirst: TemplateRef<any>|null = null;
  @ViewChild('thenSec', {static: true}) thenSec: TemplateRef<any>|null = null;

  constructor(private token: TokenService ,private serviceForm : FormationService) {
    this.currentUser = this.token.getUser();
  }

  listFormation  : Formation[];
 public temp : any;

  ngOnInit(): void {

    this.getAllFormation();

    fetch('https://api.openweathermap.org/data/2.5/weather?q=ariana&units=metric&appid=50a7aa80fa492fa92e874d23ad061374')
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
        this.pressure += pressure ;
        this.humidite = humidity;
        this.temp = tempValue.toFixed(1);

        this.desc = descValue;


      });


  }


  getAllFormation()
  {
    return  this.serviceForm.getFormation().subscribe(
      (data : Formation[]) => {this.listFormation = data;

      });
  }

  nextCourses() {
    this.index++;

    if (this.index === this.listFormation.length) {
      this.index = 0;
    }
  }
}
