import {Component, OnInit, Output, EventEmitter, ViewChild, Input} from '@angular/core';
import {DialogComponent} from "@syncfusion/ej2-angular-popups";
import {DropDownListComponent} from "@syncfusion/ej2-angular-dropdowns";
import {User} from "../core/model/User";
import {FormationService} from "../services/formation.service";

@Component({
  selector: 'app-add-edit-former',
  templateUrl: './add-edit-former.component.html',
  styleUrls: ['./add-edit-former.component.scss']
})
export class AddEditFormerComponent implements OnInit {


  @Output() refreshDoctors = new EventEmitter<string>();
  @ViewChild('newDoctorObj') newDoctorObj: DialogComponent;
  @ViewChild('specializationObj') specializationObj: DropDownListComponent;

  @Input() user:User=new User;

  public doctorsData: Record<string, any>[];
  public activeDoctorData: Record<string, any>;
  public dialogState: string;
  public animationSettings: Record<string, any> = { effect: 'None' };
  public title = 'New Former';
  public selectedGender = 'Male';
  public specializationData: Record<string, any>[];
  public fields: Record<string, any> = { text: 'Text', value: 'Id' };
 // public experienceData: Record<string, any>[] = experienceData;
 // public dutyTimingsData: Record<string, any>[] = dutyTimingsData;


  constructor(private serviceForm : FormationService) {
    this.specializationData = [
      { DepartmentId: 1, Id: 'generalmedicine', Text: 'General Medicine', Color: '#F538B2' },
      { DepartmentId: 2, Id: 'neurology', Text: 'Neurology', Color: '#33C7E8' },
      { DepartmentId: 3, Id: 'dermatology', Text: 'Dermatology', Color: '#916DE4' },
      { DepartmentId: 4, Id: 'orthopedics', Text: 'Orthopedics', Color: '#388CF5' },
      { DepartmentId: 5, Id: 'diabetology', Text: 'Diabetology', Color: '#60F238' },
      { DepartmentId: 6, Id: 'cardiology', Text: 'Cardiology', Color: '#F29438' }
    ];
  }

  ngOnInit(): void {
  }


  addFomateur()
  {
    this.serviceForm.register(this.user).subscribe(data=>console.log(data));
    this.refreshDoctors.emit();
  }

  public onAddDoctor(): void {
    this.dialogState = 'new';
    this.title = 'New Former';
    this.newDoctorObj.show();
  }

  public onGenderChange(args: Record<string, any>): void {
    this.selectedGender = args.target.value;
  }

  onBeforeOpen($event: any) {

  }

  onCancelClick() {
    this.newDoctorObj.hide();
  }

  onSaveClick() {

  }
}
