import {Component, Input, OnInit , ViewChild, ViewEncapsulation} from '@angular/core';

import {
  DayService, WeekService, WorkWeekService, MonthService, AgendaService, TimelineViewsService,
  TimelineMonthService, ResizeService, DragAndDropService, EventSettingsModel, ActionEventArgs,
  ScheduleComponent, CellClickEventArgs, TimeScaleModel, GroupModel,
  PopupOpenEventArgs, EJ2Instance, getWeekFirstDate, addDays, NavigatingEventArgs, WorkHoursModel
} from '@syncfusion/ej2-angular-schedule';
import { Query,DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import {FormationService} from "../services/formation.service";
import {Formation} from "../core/model/Formation";
import { CalendarOptions } from '@fullcalendar/angular';
import { ItemModel, TreeViewComponent, DragAndDropEventArgs } from '@syncfusion/ej2-angular-navigations';

import {
  remove, addClass, closest, Browser, L10n, Internationalization, extend, isNullOrUndefined, createElement
} from '@syncfusion/ej2-base';
import {User} from "../core/model/User";

import { DropDownList, ComboBox } from '@syncfusion/ej2-angular-dropdowns';
import {AddEditFormerComponent} from "../add-edit-former/add-edit-former.component";
import {DialogComponent} from "@syncfusion/ej2-angular-popups";
import {CalendarSettings} from "../calendar-settings";
import {ToastComponent} from "@syncfusion/ej2-angular-notifications";
import { ChangeEventArgs } from '@syncfusion/ej2-angular-inputs';
import {MatSnackBar} from "@angular/material/snack-bar";

L10n.load({
  'en-US': {
    schedule: {
      newEvent: 'Add Courses',
      editEvent: 'Edit Courses'
    }
  }
});

declare var $: any;
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [
    DayService, WeekService, WorkWeekService, MonthService, AgendaService, TimelineViewsService,
    TimelineMonthService, ResizeService, DragAndDropService
  ],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit {



  @ViewChild('scheduleObj') scheduleObj: ScheduleComponent;

  @ViewChild('addEditFormerObj') addEditDoctorObj: AddEditFormerComponent;

  @ViewChild('specialistObj') specialistObj: DialogComponent;

  @ViewChild('dropdownObj') dropdownObj: DropDownList;
  @ViewChild('calendarToast') toastObj: ToastComponent;
  @ViewChild('treeObj') treeObj: TreeViewComponent;
  @ViewChild('waitingObj') waitingObj: DialogComponent;

  public footerTemplate = `<div class="add-doctor"><div class="e-icon-add e-icons"></div>
    <div class="add-doctor-text">Add New Former</div></div>`;

  public itemTemplate: string = '<div class="specialist-item"><img class="value" src="assets/images/profile/user-uploads/user-03.jpg" alt="doctor"/>' +
    '<div class="doctor-details"><div class="name">Mr.${displayName}</div><div class="designation">${profession}</div></div></div>';

  public animationSettings: Record<string, any> = { effect: 'None' };

  public group: GroupModel = { enableCompactView: false, resources: ['Departments', 'Doctors'] };
  public comboBox: ComboBox;
  public currentDate: Date;
  public calendarSettings: CalendarSettings;
  @Input() fr:Formation=new Formation;
  @Input() user:User=new User;
  public scheduleInstance : ScheduleComponent;

  public eventSettings: EventSettingsModel;


  public position: Record<string, any> = { X: 'Right', Y: 'Bottom' };

  public toastWidth = '580px';
  public toastContent: string;

  public workDays: Array<number> = [0, 1, 2, 3, 4, 5, 6];
  public workHours: WorkHoursModel = { start: '08:00', end: '21:00' };
  public firstDayOfWeek = 1;
  public startHour: string;
  public endHour: string;
  idF : number=2;




  public allowDragAndDrop = true;
  @Input() formation: Formation ;
  constructor(private serviceForm : FormationService,private snackbar:MatSnackBar ) {
    this.getdata();
   // (FieldValidator.prototype as any).errorPlacement = this.dataService.errorPlacement;
  }
  public listFomation : Formation[]=[];
  public listFomateur : User[]=[];


  public instance: Internationalization = new Internationalization();
  public getDateHeaderText: Function = (value: Date): string => this.instance.formatDate(value, { skeleton: 'MMMEd' }).toUpperCase();

  event :[];

  public  field : {[key : string]:any};

  public fields: Object = { text: 'displayName', value: 'id' };
  // set the placeholder to DropDownList input element
  public waterMark: string = 'Select a game';
  // set the value to select an item based on mapped value at initial rendering
  public value: string = 'Game3';

  title : string ="Calendar Courses ";

  public currentView: string='Month';

  public formateur :User;

  eventObject : EventSettingsModel;

  calendarOptions: CalendarOptions;

  handleDateClick(arg: { dateStr: string; }) {
    alert('date click! ' + arg.dateStr);
  }

  ngOnInit(): void {
    this.getformation();
    this.getFormateur();
    console.log(this.idF);
    this.getFormateurByFormation();





    if (this.specialistObj) {
      this.specialistObj.hide();
    }
    if (Browser.isDevice && this.dropdownObj) {
      this.toastWidth = '300px';
      addClass([this.dropdownObj.element], 'e-specialist-hide');
    }




  }


  addFormateur()
  {

    this.serviceForm.register(this.user).subscribe(data=>console.log(data));
  }
  getAllFormateur()
  {
    this.serviceForm.getFormateur().subscribe((data:User[])=>{this.listFomateur = data});

  }
  UpdateFormation(f: Formation)
  {
    this.serviceForm.updateFormation(f,this.formation.idFormation).subscribe(
      data=>{
        this.getformation();
        this.getdata();
      });
    this.snackbar.open(' Produit mis a jours avec succées', 'Undo', {
      duration: 2000
    });
  }

  getFormateur()
  {
    this.serviceForm.getFormateur().subscribe(
      data=> {
        this.listFomateur = data
      }
    );
    return this.listFomateur;
  }




  getdata()
  {

    let xx = new XMLHttpRequest();
    let xmll = new XMLHttpRequest();


    xmll.onreadystatechange = ()=>
    {
      this.event = JSON.parse(xmll.responseText)
    };
    xx.onreadystatechange = ()=>
    {
      this.formateur = JSON.parse(xx.responseText)
    };

    xx.open('get','http://localhost:8090/Courses/retrieveFormateur',true);


    xx.send(null);


    xmll.open('get','http://localhost:8090/Courses/retrieveFormation',true);


    xmll.send(null);





  setTimeout( () =>
  {




    this.eventObject = {
      dataSource :this.event,
      fields : {
        subject : {name : 'title',default : " Event "},
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
      dataSource : this.formateur,id:'id',text : 'firstName'
    };

  },550)





  }


  dataId(form : Formation)
  {
    this.idF = form.idFormation;
    this.formation = form;
  }




  deleteFormation(i :number)
  {
    this.serviceForm.deleteFormation(i)
      .subscribe(response => {
        this.listFomation = this.listFomation.filter(item => item.idFormation !== i);


      });
    this.snackbar.open(' delete successfully', 'Undo', {
      duration: 2000
    });
  }





  public waitingList : {[key : string]:Object}[]= [

    {
      Id:1,
      Name: 'Steven'
    }

  ];





/*
  onDragStart(args : DragEventArgs ):void
  {
    args.interval = 1;

    args.navigation?.enable
  }

 */

  public onItemDrag(event: any): void {
    if (this.scheduleObj.isAdaptive) {
      const classElement: HTMLElement | null = this.scheduleObj.element.querySelector('.e-device-hover');
      if (classElement) {
        classElement.classList.remove('e-device-hover');
      }
      if (event.target.classList.contains('e-work-cells')) {
        addClass([event.target], 'e-device-hover');
      }
    }
    if (document.body.style.cursor === 'not-allowed') {
      document.body.style.cursor = '';
    }
    if (event.name === 'nodeDragging') {
      const tooltipElement: NodeListOf<HTMLElement> = document.querySelectorAll('.e-drag-item.e-treeview');
      let status: boolean;
      tooltipElement.forEach((node: HTMLElement) => {
        node.style.display = 'block';
       // status  =  document.querySelector('body').offsetWidth <= node.offsetLeft + node.offsetWidth ;
      });
      const targetEle: Element = closest(event.target, '.droppable');
      if (!targetEle ) {
        tooltipElement.forEach((node: HTMLElement) => node.style.display = 'none');
        event.cancel = true;
        return;
      }
      const dragElementIcon: NodeListOf<HTMLElement> = document.querySelectorAll('.e-drag-item.treeview-external-drag .e-icon-expandable');
      dragElementIcon.forEach((node: HTMLElement) => node.style.display = 'none');
    }
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

    this.scheduleInstance.addEvent(eventData);

    console.log(eventData);
  }

/*  onResizStart(args : ResizeEventArgs):void{
    args.interval = 1 ;

  }

 */




  public eventData : DataManager = new DataManager(
    {
      url : 'https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData',
      adaptor: new WebApiAdaptor,
      crossDomain : true
    }
  );


 // setViews: View[] = ["Day","Month","Agenda","TimelineMonth","TimelineDay","TimelineWeek"];
 // public setView :View = "Month";
  public selectedDate : Date = new Date(2022,3,1);
  public timeScale: TimeScaleModel = { enable: true, interval: 60 };

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




    public events : EventSettingsModel = {


      dataSource:

        [{
          idFormation: 1,
          Subject: "tttt",
          niveau: "aa",
          nbrHeures: 12,
          domain: "IT",
          nbrMaxParticipant: 10,
          frais: 56,
          EndTime: new Date(2022, 3, 20, 4, 0),
          StartTime: new Date(2022, 3, 20, 4, 0),


        },
          {
            idFormation: 2,
            Subject: "new",
            niveau: "aas",
            nbrHeures: 8,
            domain: "ART",
            nbrMaxParticipant: 20,
            frais: 56,
            EndTime: new Date(2022, 3, 13, 4, 0),
            StartTime: new Date(2022, 3, 13, 4, 0),

          }
        ]
    };





  public onMultiSelectOpen(args: any): void {
    args.popup.element.querySelector('.add-doctor').onclick = this.onAddClick.bind(this);
  }

  public onAddClick(): void {
    this.addEditDoctorObj.onAddDoctor();
  }

  public onSpecialistSelect(args: Record<string, any>): void {
    const target: HTMLElement = closest(args.target, '.specialist-item') as HTMLElement;
   // const deptId: string = target.getAttribute('data-deptid');
   // const doctorId: string = target.getAttribute('data-doctorid');
  //  this.refreshDataSource(deptId, doctorId);
  //  const doctorImage: HTMLElement = this.scheduleObj.element.querySelector('.doctor-icon .active-doctor');
 //   doctorImage.setAttribute('src', './assets/images/' + this.activeDoctorData[0].Text + '.png');
    this.specialistObj.hide();
  }

  getFormateurByFormation()
  {
    this.serviceForm.getFormateurbyFormation(this.formateur.id).subscribe(
      (data:User)=>{this.formateur = data}
    );
    return this.formateur;
  }

  onActionBegin($event: any) {

  }

  public onPopupOpen(args: PopupOpenEventArgs): void {
  }

  public createNewEvent(e: MouseEvent): void {
   /* const args = e as CellClickEventArgs & MouseEvent;
    let data: CellClickEventArgs;
    const isSameTime: boolean =
      this.scheduleObj.activeCellsData.startTime.getTime() === this.scheduleObj.activeCellsData.endTime.getTime();
    if (this.scheduleObj.activeCellsData && !isSameTime) {
      data = this.scheduleObj.activeCellsData;
    } else {
      const interval: number = this.scheduleObj.activeViewOptions.timeScale.interval;
      const slotCount: number = this.scheduleObj.activeViewOptions.timeScale.slotCount;
      const msInterval: number = (interval * 60000) / slotCount;
      const startTime: Date = new Date(this.scheduleObj.selectedDate.getTime());
      startTime.setHours(new Date().getHours(), Math.round(startTime.getMinutes() / msInterval) * msInterval, 0);
      const endTime: Date = new Date(new Date(startTime.getTime()).setMilliseconds(startTime.getMilliseconds() + msInterval));
      data = { startTime, endTime, isAllDay: false };
    }
    this.scheduleObj.openEditor(extend(data, { cancel: false, event: args.event }), 'Add');

    */
  }



  public onNavigation(args: NavigatingEventArgs): void {
    this.currentDate = args.currentDate || this.selectedDate;
    if (this.listFomation.length > 0) {
      //this.updateBreakHours(this.currentDate);
     // this.eventData = this.generateEvents(this.activeDoctorData[0]);
     // this.scheduleObj.eventSettings.dataSource = this.eventData;
      //this.updateWaitingList(this.activeDoctorData[0].DepartmentId);
    } else {
     // this.updateWaitingList();
    }
  }

  public onEventRendered(args: Record<string, any>): void {
    if (args.element.classList.contains('e-appointment')) {
      const data: Record<string, any> = args.data as Record<string, any>;
      const eventStart = data.StartTime as Date;
      const eventEnd = data.EndTime as Date;
      let eventCollection = this.scheduleObj.blockProcessed;
      eventCollection = this.scheduleObj.eventBase.filterEvents(eventStart, eventEnd, eventCollection);
      if (eventCollection.length > 0) {
        args.cancel = true;
        return;
      }
      args.element.style.color = '#fff';
    }
  }


  public setDefaultData(): void {

    this.scheduleObj.eventSettings.dataSource = this.eventData;
    this.scheduleObj.refreshEvents();
    this.startHour = this.calendarSettings.calendar.start as string;
    this.endHour = this.calendarSettings.calendar.end as string;
    this.workDays = [0, 1, 2, 3, 4, 5, 6];
    this.workHours = { start: '08:00', end: '21:00' };
    this.scheduleObj.workHours = this.workHours;
  }

  public getEventDetails(data : Formation): string {

    return (this.instance.formatDate(new Date(data.start), { type: 'date', skeleton: 'long' }) +
      '(' + this.getString(new Date(data.start), 'hm') + '-' + this.getString(new Date(data.end), 'hm') + ')');

  }

  public getString(value: Date, type: string): string {
    return this.instance.formatDate(new Date(value), { type: 'dateTime', skeleton: type });
  }

  public specializationData: Record<string, any>[] = [
    { domain: "IT",Text: 'IT', Color: '#F538B2' },
    { domain: "ART",  Text: 'ART', Color: '#33C7E8' },
    { domain: "CINEMA", Text: 'CINEMA', Color: '#916DE4' },
    { domain: "MUSIC",  Text: 'MUSIC', Color: '#388CF5' },
    { domain: "DANCE",  Text: 'DANCE', Color: '#60F238' },
    { domain: "PHY", Text: 'PHY', Color: '#F29438' }
  ];

  public resource : Object[] = [

    { domain: "IT", Text: 'IT', Color: '#F538B2' },
    { domain: "ART", Text: 'ART', Color: '#33C7E8' },
    { domain: "CINEMA", Text: 'CINEMA', Color: '#916DE4' },
    { domain: "MUSIC", Text: 'MUSIC', Color: '#388CF5' },
    { domain: "DANCE", Text: 'DANCE', Color: '#60F238' },
    { domain: "PHY", Text: 'PHY', Color: '#516275' },
    { domain: "ECONOMIC", Text: 'ECONOMIC', Color: '#F29438' },
    { domain: "MARKETING", Text: 'MARKETING', Color: '#f21526' }
  ];


  getBackGroundColor(data : Formation) {
    let color: string;
    if(data.domain === "IT")
    {
      color = '#F538B2';
    }else if(data.domain == "ART") {
      color = '#33C7E8';
    }
    else if(data.domain == "CINEMA") {
      color = '#916DE4';
    }
    else if(data.domain == "MUSIC") {
      color = '#388CF5';
    }
    else if(data.domain == "DANCE") {
      color = '#60F238';
    }
    else if(data.domain == "PHY") {
      color = '#516275';
    }
    else if(data.domain == "ECONOMIC") {
      color = '#F29438';
    }
    else if(data.domain == "MARKETING") {
      color = '#f21526';
    }else
    {
      color = '#ffc9da';
    }



    return { 'background-color': color, color: '#FFFFFF' };
  }
  public onItemChecked(args: ChangeEventArgs): void {
   /* const waitItemId: string = closest(args.event.currentTarget as HTMLElement, '.e-checkbox-wrapper').id;
    this.selectedWaitingItem.push(this.waitingList.filter((item: Record<string, any>) => item.Id === parseInt(waitItemId, 10))[0]);*/
  }

  public onItemAdd(): void {
   /* if (this.selectedWaitingItem.length > 0) {
      this.selectedWaitingItem.forEach((activeItem: Record<string, any>) => {
        const eventFilter: Record<string, any>[] = this.eventData.filter((event: Record<string, any>) => event.Id === activeItem.Id);
        if (eventFilter.length === 0) {
          const doctorData: Record<string, any>[] = this.activeDoctorData.length > 0 ?
            this.activeDoctorData.filter((data: Record<string, any>) => data.DepartmentId === activeItem.DepartmentId) : [];
          const isActiveDepartment: boolean = doctorData.length > 0;
          if (isActiveDepartment) {
            activeItem.DoctorId = doctorData[0].Id;
          } else {
            const filteredData: Record<string, any>[] = this.doctorsData.filter((data: Record<string, any>) =>
              data.DepartmentId === activeItem.DepartmentId);
            activeItem.DoctorId = filteredData[0].Id;
          }
          this.eventData.push(activeItem);
          this.refreshWaitingItems(activeItem.Id as number);
          if (this.activeDoctorData.length > 0) {
            this.hospitalData.push(activeItem);
          }
          this.dataService.addHospitalData(this.hospitalData);
        }
      });
      this.selectedWaitingItem = [];
      this.waitingObj.hide();
      this.scheduleObj.eventSettings.dataSource = this.eventData;
      this.scheduleObj.refreshEvents();
    } else {
      this.toastContent = 'Please select the waiting item to add';
      this.toastObj.show();
    }
    if (this.activeDoctorData.length > 0) {
      this.updateWaitingList(this.activeDoctorData[0].DepartmentId);
    } else {
      this.updateWaitingList();
    }*/
  }

}
