import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";
import {ComplaintService} from "../helpservice/complaint.service";
import {Complaint} from "../../core/model/Complaint";

@Component({
  selector: 'app-update-complaint',
  templateUrl: './update-complaint.component.html',
  styleUrls: ['./update-complaint.component.css']
})
export class UpdateComplaintComponent implements OnInit {
  currentComplaint =new Complaint();
  constructor(private activatedRoute: ActivatedRoute,
              private router :Router, private complaintService :ComplaintService) { }

  ngOnInit(): void {
    this.complaintService.consulterComplaint(this.activatedRoute.snapshot.params.id).
    subscribe( compl =>{ this.currentComplaint = compl; });
  }
  updateComplaint() {
    this.complaintService.updateComplaint(this.currentComplaint).subscribe(() => {
        this.router.navigate(['complaint']);
      },(error) => { alert("Problème lors de la modification !"); }
    );
  }
}
