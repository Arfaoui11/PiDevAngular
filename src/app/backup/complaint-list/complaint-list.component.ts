import { Component, OnInit } from '@angular/core';

import {ComplaintService} from "../helpservice/complaint.service";
import {Router} from "@angular/router";
import {Complaint} from "../../core/model/Complaint";

@Component({
  selector: 'app-complaint-list',
  templateUrl: './complaint-list.component.html',
  styleUrls: ['./complaint-list.component.css']
})
export class ComplaintListComponent implements OnInit {
  comlpaints: Complaint[];
  totalLength: any;
  page: number= 1;
  constructor(private complaintservices:ComplaintService , private router :Router) { }

  ngOnInit(): void {
    this.complaintservices.RetrieveComplaint().subscribe(data => {
      console.log(data);
      this.comlpaints = data;
      this.totalLength = data.length;
    });
  }
  deleteComplaintById(c: Complaint)
  {
    console.log("supp supprimé"+c);
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.complaintservices.DeleteComplaint(c.idCom).subscribe(() => {
        console.log("appointment supprimé");
        this.SuprimerComplaintDuTableau(c);
      });
  }

  SuprimerComplaintDuTableau(c :Complaint) {
    this.comlpaints.forEach((cur, index) => {
      if(c.idCom=== cur.idCom) {
        this.comlpaints.splice(index, 1);
      }
    });
  }
  ExportPDF() {
    this.complaintservices.exportPdfComplaint().subscribe(
      x => {
        const blob = new Blob([x], {type: 'application/pdf'});
        if (window.navigator && window.navigator.msSaveOrOpenBlob){
          window.navigator.msSaveOrOpenBlob(blob);
          return;
        }
        const data = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = data;
        link.download = 'complaints.pdf';
        link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true , view: window}));
        // tslint:disable-next-line:only-arrow-functions
        setTimeout(function() {
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
      });

  }
  SearchMultiple(key:string): void {
    if (key == '') {
      this.complaintservices.RetrieveComplaint()
    } else if (key != null) {
      this.complaintservices.SearchMultiple(key).subscribe(
        (data: Complaint[]) => {
          this.comlpaints = data
        }
      );
    }

  }
}
