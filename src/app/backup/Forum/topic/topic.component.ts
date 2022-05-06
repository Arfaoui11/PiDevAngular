/*
import {Component, Input, OnInit} from '@angular/core';

import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels} from "ngx-qrcode2";
import {ChartType} from "angular-google-charts";
import { Topic } from 'src/app/core/model/Topic';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  @Input() topic:Topic=new Topic;
  Topic = new Topic();

  sowTopic : boolean = false;

  listTopic : Topic[]=[];

  key: any;


  public imagePath :FileList;

  idT : number;
  elementType= NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.MEDIUM;



  type2 = ChartType.Bar;
  title = 'Numbre Apprenant By Topic';
  type = ChartType.PieChart;

  columnNames = ['Browser', 'Percentage'];
  options = {
  };
  width = 550;
  height = 400;


  data1:any;
  ArrayListT:any=[];

  name : string;


  constructor() { }

  ngOnInit(): void {
  }

}

 */

