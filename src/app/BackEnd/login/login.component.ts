import { Component, OnInit } from '@angular/core';
import {FormationService} from "../../CoursesSpace/services/formation.service";

import {ActivatedRoute, Router} from "@angular/router";
import {TokenService} from "../../CoursesSpace/services/token.service";
import {UserServicesService} from "../../CoursesSpace/services/user-services.service";
import {User} from "../../core/model/User";
import {AppdataService} from "../../CoursesSpace/services/appdata.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  currentUser: any;



  constructor(private appDataService: AppdataService,private authService: FormationService,private router:Router, private tokenStorage: TokenService, private route: ActivatedRoute, private userService: UserServicesService) { }

  ngOnInit(): void {
    const token: string | null = this.route.snapshot.queryParamMap.get('token');
    const error: string | null = this.route.snapshot.queryParamMap.get('error');
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.currentUser = this.tokenStorage.getUser();
    }
    else if(token){
      this.tokenStorage.saveToken(token);
      this.userService.getCurrentUser().subscribe(
        data => {
          this.login(data);
        },
        err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
    }
    else if(error){
      this.errorMessage = error;
      this.isLoginFailed = true;
    }
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.login(data.user);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  login(user:User): void {
    this.tokenStorage.saveUser(user);
    this.isLoginFailed = false;
    this.isLoggedIn = true;
    this.currentUser = this.tokenStorage.getUser();

    this.appDataService.id = this.currentUser.id;
    this.appDataService.displayName = this.currentUser.displayName;

    if (this.currentUser.roles[0] == "ROLE_ADMIN")
    {
       window.location.href = '#/home/Formation-management';
    }else if (this.currentUser.roles[0] == "ROLE_MODERATOR")
    {
      window.location.href = '#/home/Formation-management/calendarCourses/'+this.currentUser.id;
    }else
    {

      window.location.href = '../homeF';
    }



  }

}
