import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AuthGaurd } from './services/auth-gaurd.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {HttpModule} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { RouterModule} from '@angular/router';
import { AuthService } from './services/auth.service';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { StoryComponent } from './story/story.component';
import { UploadService } from './services/upload.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    SignupComponent,
    AdminComponent,
    NoAccessComponent,
    StoryComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterModule.forRoot([
      {path:'',component:HomeComponent},
      {path:'login',component:LoginComponent},
      {path:'signup',component:SignupComponent},
      {path:'admin',component:AdminComponent,canActivate:[AuthGaurd,AdminAuthGuard]},
      {path:'profile',component:ProfileComponent},
      {path:'story',component:StoryComponent},
      {path:'no-access',component:NoAccessComponent}
    ])
  ],
  providers: [AuthService,AuthGaurd,AdminAuthGuard,UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
