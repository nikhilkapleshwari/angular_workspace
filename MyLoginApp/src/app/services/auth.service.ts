import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {JwtHelperService } from '@auth0/angular-jwt'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private signinLink:string="http://localhost:8081/signin";
  private signupLink:string="http://localhost:8081/signup";
  constructor(private http:Http) { }


  loginMethod(credentials){
    return this.http.post(this.signinLink,JSON.stringify(credentials));
  }

  signupMethod(credentials){
    return this.http.post(this.signupLink,JSON.stringify(credentials));
  }

  logout(){
    localStorage.removeItem('token');
  }

  isLoggedIn(){
    let jwtHelperService=new JwtHelperService();
    let token=localStorage.getItem('token');
     
     if(!token)return false;
    
     let expirationDate=jwtHelperService.getTokenExpirationDate(token);
     let isExpired=jwtHelperService.isTokenExpired(token);

     return !isExpired;
  }

  currentUser(){
    let token=localStorage.getItem('token');
    if(!token)return false;

    let subject=new JwtHelperService().decodeToken(token).sub;
        return JSON.parse(subject);

  }
}
