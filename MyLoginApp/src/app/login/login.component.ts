import { Component, OnInit } from '@angular/core';
import { FormsModule,FormGroup,FormControl, Validators } from '@angular/forms';
import { UsernameValidators } from './username.validators';
import { AuthService } from './../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login-new.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin:Boolean;
  constructor(private router:Router,
              private route:ActivatedRoute,
              private service:AuthService){
}

ngOnInit(){
  
}

  form = new FormGroup({
    userName: new FormControl('',[
              Validators.required,
              Validators.minLength(3),
              UsernameValidators.cannotContainSpace],
              UsernameValidators.shouldBeUnique),
    password: new FormControl('',Validators.required)
  });
  submit(f){
    console.log(f);
  }

  get userName(){
    return this.form.get('userName');
  }

  get password(){
    return this.form.get('password');
  }

  login(credentials){
    this.service.loginMethod(credentials)
        .subscribe(response=>{
          if(response){
            this.invalidLogin=false;
            console.log("Login Successful.");
            let token=response.json().token;
            localStorage.setItem('token',token);
            let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl');
            this.router.navigate([returnUrl || 'profile']);
          }
        },error=>{
          this.invalidLogin=true; 
        })
  }
}
