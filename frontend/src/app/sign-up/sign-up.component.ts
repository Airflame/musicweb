import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  user:User | undefined;

  form: any = {
    username: null,
    password: null,
    password2:null,
    email: null,
    first_name:null,
    last_name:null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private router: Router,  private authService: AuthService ) { 

  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.register(this.form.username, this.form.password, this.form.password2, this.form.email, this.form.first_name, this.form.last_name).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
