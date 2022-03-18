import {Component, OnInit, ViewChild} from '@angular/core';
import {
  EventSettingsModel,
  View,
  DragEventArgs,
  ResizeEventArgs,
  ScheduleComponent,
  CellClickEventArgs,
  WorkHoursModel,
  GroupModel
} from '@syncfusion/ej2-angular-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import {FormationService} from "../services/formation.service";
import {Formation} from "../core/model/Formation";
import { CalendarOptions } from '@fullcalendar/angular';
import { DragAndDropEventArgs } from '@syncfusion/ej2-angular-navigations';

import {
  remove, addClass, closest, Browser, L10n, Internationalization, extend, isNullOrUndefined, createElement
} from '@syncfusion/ej2-base';


declare var $: any;
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {



  @ViewChild('scheduleObj')


  public group: GroupModel = { enableCompactView: false, resources: ['Departments', 'Doctors'] };


  public scheduleInstance : ScheduleComponent;

  public firstDayOfWeek = 1;

  title : string ="Calendar Courses "

  public currentView: string;

  public workHours: WorkHoursModel = { start: '08:00', end: '21:00' };

  public allowDragAndDrop = true;
  constructor(private serviceForm : FormationService ) { }
  listFomation : Formation[]=[];


  public instance: Internationalization = new Internationalization();
  public getDateHeaderText: Function = (value: Date): string => this.instance.formatDate(value, { skeleton: 'MMMEd' }).toUpperCase();

  event :[];

  public  field : {[key : string]:any};

  public formateur :[];

  eventObject : EventSettingsModel;

  calendarOptions: CalendarOptions;

  handleDateClick(arg: { dateStr: string; }) {
    alert('date click! ' + arg.dateStr)
  }

  ngOnInit(): void {

   this.getdata()


       this.getformation();



  }




  getdata()
  {

    let xx = new XMLHttpRequest();
    let xmll = new XMLHttpRequest();


    xmll.onreadystatechange = ()=>
    {
      this.event = JSON.parse(xmll.responseText)
    }
    xx.onreadystatechange = ()=>
    {
      this.formateur = JSON.parse(xx.responseText)
    }

    xx.open('get','http://localhost:8090/SpringMVC/form/retrieveFormateur',true)


    xx.send(null)


    xmll.open('get','http://localhost:8090/SpringMVC/form/retrieveFormation',true)


    xmll.send(null)





  setTimeout( () =>
  {




    this.eventObject = {
      dataSource :this.event,
      fields : {
        subject : {name : 'title',default : "hello Environment"},
        startTime : {name : 'start'},
        endTime : {name : 'end'}
      }
    };


    this.calendarOptions= {
      initialView: 'dayGridMonth',
      dateClick: this.handleDateClick.bind(this), // bind is important!

      events:  this.event


    };

    this.field = {
      dataSource : this.formateur,id:'id',text : 'nom'
    };

  },100)





  }




  public waitingList : {[key : string]:Object}[]= [

    {
      Id:1,
      Name: 'Steven'
    }

  ];






  onDragStart(args : DragEventArgs ):void
  {
    args.interval = 1;

    args.navigation?.enable
  }

  onTreeDragStartStop(args : DragAndDropEventArgs ):void
  {
    const cellData : CellClickEventArgs = this.scheduleInstance.getCellDetails(args.target);

    let eventData : { [key :string]:Object } ={
      Subject: args.draggedNodeData.text,
      StartTime : cellData.startTime,
      EndTime : cellData.endTime,
      IsAllDay : cellData.isAllDay
    };

    this.scheduleInstance.addEvent(eventData)


  }

  onResizStart(args : ResizeEventArgs):void{
    args.interval = 1 ;




  }




  public eventData : DataManager = new DataManager(
    {
      url : 'https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData',
      adaptor: new WebApiAdaptor,
      crossDomain : true
    }
  )


  setViews: View[] = ["Day","Month","Agenda","TimelineMonth","TimelineDay","TimelineWeek"];
  public setView :View = "Month";
  public SetDate : Date = new Date(2022,1,1);

  StartTime: Date = new Date(2022, 3, 1, 10, 0);
  EndTime: Date = new Date(2018, 1, 7, 11, 0);



  getformation(){

      this.serviceForm.getFormation().subscribe(
        (data:Formation[])=>{this.listFomation = data});
      return this.listFomation;
    }


  Data: Record<string, any>[] = [
    {
      Id: 1000,
      Name: 'Milka',
      Subject : 'Test',
      StartTime: new Date(2022, 7, 5, 10, 30),
      EndTime: new Date(2022, 7, 5, 11, 30),
      Disease: 'Bone Fracture',
      DepartmentName: 'ORTHOPEDICS',
      DepartmentId: 4,
      DoctorId: 5,
      PatientId: 2,
      Symptoms: 'Swelling or bruising over a bone, Pain in the injured area'
    }];


  /*

    public eventObject : EventSettingsModel = {


      dataSource:

       [{"idFormation":1,
          "subject":"tttt",
          "niveau":null,
          "nbrHeures":12,
          "domain":null,
          "nbrMaxParticipant":1,
          "frais":56,
          "endTime": new Date(2022,2,20,4,0),
          "startTime":new Date(2022,2,20,4,0)}]

        [{


        EventTitle:"Testing",
        EventStart : new Date(2022,2,18,4,0),
        EventEnd : new Date(2022,2,18,6,0),
         // IsAllDay : true,
         // IsReadonly : true,
         // IsBlock : true,
         // RecurrenceRule : "FREQ=DAILY;INTERVAL=1;COUNT=1"

        },
        {
          EventTitle:"Angular Projet",
          EventStart : new Date(2022,2,20,4,0),
          EventEnd : new Date(2022,2,21,6,0),
          // IsAllDay : true,
          // IsReadonly : true,
          // IsBlock : true,
          //RecurrenceRule : "FREQ=DAILY;INTERVAL=1;COUNT=2"

        }
      ],
      fields : {
        subject : {name : 'EventTitle',default : "hello Environment"},
        startTime : {name : 'EventStart'},
        endTime : {name : 'EventEnd'}
      }


  }

  */



}
