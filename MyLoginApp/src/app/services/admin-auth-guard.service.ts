import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {


  constructor(private router:Router,private service:AuthService) { }

  canActivate(){
    let user=this.service.currentUser();
    if(user && user.role==='ADMIN')return true;

    this.router.navigate(['/no-access']);
    return false;

}
}
