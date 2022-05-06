import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';

import {PartnerInstitutionService} from "../services/partner-institution.service";
import {PartnerInstitution} from "../../../core/model/PartnerInstitution";

@Component({
  selector: 'app-add-partner-institution',
  templateUrl: './add-partner-institution.component.html',
  styleUrls: ['./add-partner-institution.component.css']
})
export class AddPartnerInstitutionComponent implements OnInit {

  partner: PartnerInstitution = new PartnerInstitution();

  constructor(private partnerService: PartnerInstitutionService, private router: Router, private activatedRoute: ActivatedRoute) {
    const isIdPresent = this.activatedRoute.snapshot.paramMap.has('id');
    if (isIdPresent){
      let id: number;
      // @ts-ignore
      id = +this.activatedRoute.snapshot.paramMap.get('id');
      this.partnerService.getPartner(id).subscribe(
        data => {this.partner = data; }
        );

    }
  }

  ngOnInit(): void {

  }
  /*savePartner(){
    this.partnerService.addUniversity(this.partner).subscribe(
      data => {
        console.log('response', data);

      }
    );
  }*/


}
