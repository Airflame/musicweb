import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  isLogged: boolean;

  constructor(private router: Router, private authService: AuthService) {
    this.isLogged = this.authService.isLoggedIn();
   }

  ngOnInit(): void {
    this.isLogged = this.authService.isLoggedIn();
  }

  logout(){
    this.authService.logout();
  }

}
