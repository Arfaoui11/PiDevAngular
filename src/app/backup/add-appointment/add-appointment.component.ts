import { Component, OnInit } from '@angular/core';

import {AppointmentService} from "../helpservice/appointment.service";
import {Router} from "@angular/router";
import {Appointment} from "../../core/model/Appointment";

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {
  newAppointment = new Appointment();
  message :string;
  constructor(private services : AppointmentService,
              private router :Router) { }
  ngOnInit(): void {
  }

  AddAppointment(){
    this.services.AddAppointment(this.newAppointment).subscribe(appoin => {
      console.log(appoin);

    });

    this.router.navigate(['appointment']).then(() => {
      window.location.reload();
    });

  }

}
