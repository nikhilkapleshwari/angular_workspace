import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurd implements CanActivate{

  constructor(private router:Router,private service:AuthService) { }
  
  canActivate(route,state:RouterStateSnapshot){
    if(this.service.isLoggedIn()) return true;

    this.router.navigate(['/login'],{queryParams:{returnUrl:state.url}});
    return false;
  }

}
