import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../core/model/User";
import {DialogComponent} from "@syncfusion/ej2-angular-popups";
import {AddEditFormerComponent} from "../add-edit-former/add-edit-former.component";
//import { TimePicker } from '@syncfusion/ej2-angular-calendars';
//
// import { EJ2Instance } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html',
  styleUrls: ['./courses-form.component.scss']
})
export class CoursesFormComponent implements OnInit {

  @ViewChild('addEditFormerObj') addEditFomerObj: AddEditFormerComponent;
  @ViewChild('breakHourObj') breakHourObj: DialogComponent;
  @ViewChild('deleteConfirmationDialogObj') deleteConfirmationDialogObj: DialogComponent;


  public selectedDepartmentId: string;

  public specializationData: Record<string, any>[];

  public  field : {[key : string]:any};

  public fields: Record<string, any> = { text: 'Text', value: 'Id' };

  public formateur :User[];


  constructor() {

   this.specializationData = [
      { DepartmentId: 1, Id: 'generalmedicine', Text: 'General Medicine', Color: '#F538B2' },
      { DepartmentId: 2, Id: 'neurology', Text: 'Neurology', Color: '#33C7E8' },
      { DepartmentId: 3, Id: 'dermatology', Text: 'Dermatology', Color: '#916DE4' },
      { DepartmentId: 4, Id: 'orthopedics', Text: 'Orthopedics', Color: '#388CF5' },
      { DepartmentId: 5, Id: 'diabetology', Text: 'Diabetology', Color: '#60F238' },
      { DepartmentId: 6, Id: 'cardiology', Text: 'Cardiology', Color: '#F29438' }
    ];

    this.getdata();
  }

  ngOnInit(): void {
  }

  public getEducation(text: string): string {
    return text.toUpperCase();
  }

  public getColor(args: Record<string, string>): string {
    return args.Color;
  }

  getdata()
  {

    let xx = new XMLHttpRequest();

    xx.onreadystatechange = ()=>
    {
      this.formateur = JSON.parse(xx.responseText)
    }

    xx.open('get','http://localhost:8090/Courses/retrieveFormateur',true)


    xx.send(null)


    setTimeout( () =>
    {

      this.field = {
        dataSource : this.formateur,value:'id',text : 'nom'
      };

    },100)





  }


  public  onAddDoctor(): void {
    this.addEditFomerObj.onAddDoctor();
  }

  onDomainClick($event: MouseEvent) {

  }

  onSpecializationChange($event: any) {

  }

  updateDoctors() {

  }
}
