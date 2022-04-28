import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TokenService} from "../../services/token.service";

@Component({
  selector: 'app-home-f',
  templateUrl: './home-f.component.html',
  styleUrls: ['./home-f.component.scss']
})
export class HomeFComponent implements OnInit {

  currentUser: any = [];

  constructor(private token: TokenService) {
    this.currentUser = this.token.getUser();
  }

  ngOnInit(): void {



  }

}
