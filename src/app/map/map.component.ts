import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import {Icon, icon} from "leaflet";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  private map: L.Map;

  private p2: L.LatLngExpression = [36.9833, 10.1167]; //



  private defaultIcon: Icon = icon({
    iconUrl: 'assets/marker-icon.png',
    shadowUrl: 'assets/marker-shadow.png'
  });

  private initMap(): void {



    this.map = L.map('map', {
      center: this.p2,
      zoom: 12
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 1,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    let city = ["Bizerte","Ariana","Sousse","Sfax"];


    let coordinates = [
      [37.2744, 9.8739],
      [36.9833, 10.1167],
      [35.8254, 10.637],
      [34.7406, 10.7603],
    ];

    for (let i = 0; i < coordinates.length; i++) {
      let marker = L.marker([coordinates[i][0], coordinates[i][1]],{icon:this.defaultIcon,title:city[i]});
      marker.addTo(this.map);
    }

    tiles.addTo(this.map);

  }

  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }

}
