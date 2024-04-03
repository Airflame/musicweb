import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];


  constructor(  
    private router: Router,  
    private authService: AuthService  
 ) { }  

 ngOnInit() {
  this.isLoggedIn = this.authService.isLoggedIn();
}  

  onSubmit() {
    this.authService.login(this.form.username, this.form.password).subscribe(
      data => {
        this.authService.setSession(data);      
        this.isLoggedIn = this.authService.isLoggedIn();
        window.location.href=""
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }


}
