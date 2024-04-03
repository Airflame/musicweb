import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { Observable, tap } from "rxjs";
import * as moment from 'moment';

const httpOptions = {
   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
 };

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) { }    

  logout() {
   localStorage.removeItem("access");
   localStorage.removeItem("refresh");
   window.location.reload();
}

  login(username:string, password:string ) {
      return this.http.post<User>('/api/auth/login/', {username, password});      
  }

   register(username:string, password:string, password2:string, email:string, first_name:string, last_name:string){
      return this.http.post<User>('/api/auth/registration/', {username, password, password2, email, first_name, last_name});
   }

   isLoggedIn() {
      return localStorage.getItem("access") !== null;
}

   isLoggedOut() {
   return !this.isLoggedIn();
}

   setSession(authResult:any) {
      const expiresAt = moment().add(authResult.refresh,'second');

      localStorage.setItem('access', authResult.access);
      localStorage.setItem('refresh', authResult.refresh)
      localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
}  
}
