import { Component, OnInit } from '@angular/core';
import { FormsModule,FormGroup,FormControl, Validators } from '@angular/forms';
import { UsernameValidators } from './../login/username.validators';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  invalidSignup:Boolean;
  constructor(private router:Router,
              private service:AuthService){
}
  ngOnInit() {
  }

  form = new FormGroup({
    userName: new FormControl('',[
              Validators.required,
              Validators.minLength(3),
              UsernameValidators.cannotContainSpace],
              UsernameValidators.shouldBeUnique),
    password: new FormControl('',Validators.required)
  });
  
  signup(credentials){
    this.service.signupMethod(credentials)
    .subscribe(response=>{
      
      if(response.json()){
        this.invalidSignup=false;
        console.log("User created.");
        this.router.navigate(['login']);
      }
    },error=>{
      console.log("User already exist!");
      this.invalidSignup=true;
    })
  }
}
