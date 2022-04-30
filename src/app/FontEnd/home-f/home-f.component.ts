import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TokenService} from "../../services/token.service";

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

  constructor(private token: TokenService) {
    this.currentUser = this.token.getUser();
  }


 public temp : any;

  ngOnInit(): void {

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



}
