import { Component, OnInit } from '@angular/core';

import {JobOfferSpaceService} from "../job-offer-space/job-offer-space.service";
import {Router} from '@angular/router';
import {Offer} from "../../../core/model/Offres";

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css']
})
export class OfferListComponent implements OnInit {

  offers: Offer[];
  totalLength: any;
  page: number = 1;

  constructor(private offerService: JobOfferSpaceService, private router: Router) {
  }

  ngOnInit(): void {
    this.offerService.getOffer().subscribe(data => {
      console.log(data);
      this.offers = data;
      this.totalLength = data.length;
    });
  }



  SuprimerOfferDuTableau(offer: Offer) {
    this.offers.forEach((cur, index) => {
      if (offer.idOffer === cur.idOffer) {
        this.offers.splice(index, 1);
      }
    });
  }








}
