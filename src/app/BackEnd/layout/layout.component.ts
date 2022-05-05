import { Component, OnInit } from '@angular/core';
import {UserServicesService} from "../../CoursesSpace/services/user-services.service";
import {TokenService} from "../../CoursesSpace/services/token.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  title: any;
  content: string;
  constructor(private userService: UserServicesService,private token: TokenService) { }
  currentUser: any;
  ngOnInit(): void {

    this.currentUser = this.token.getUser();
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

}
