import { Component, OnInit } from '@angular/core';
import {FormationService} from "../../CoursesSpace/services/formation.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  private router: any;

  constructor(private authService: FormationService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        if (this.isSuccessful)
        {
          window.location.href = '#/login';
        }
        this.isSignUpFailed = false;
      },

      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      },

    );

  }


}
