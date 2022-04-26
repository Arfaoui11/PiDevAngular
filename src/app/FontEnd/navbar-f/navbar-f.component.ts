import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../services/token.service";

@Component({
  selector: 'app-navbar-f',
  templateUrl: './navbar-f.component.html',
  styleUrls: ['./navbar-f.component.scss']
})
export class NavbarFComponent implements OnInit {



  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  currentUser: any;

  constructor(private token: TokenService) {
    this.currentUser = this.token.getUser();
  }
  ngOnInit(): void {

    this.isLoggedIn = !!this.token.getToken();

    this.currentUser = this.token.getUser();

    if (this.isLoggedIn) {
      const user = this.token.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.displayName;
    }
  }
  logout(): void {
    this.token.signOut();
    window.location.reload();
  }

}
