import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UploadService {

  form:FormGroup;
  private uploadLink:string="http://localhost:8081/upload";
  constructor(private http:Http) { }

  upload(file:File){
    const formData=new FormData();
    formData.append("file",file,file.name);
    formData.append("token",localStorage.getItem('token'));
    console.log("FormData:",formData);
    console.log("In UploadService upload method...");
    return this.http.post(this.uploadLink,formData);
  }

  download(){
    return this.http.get("http://localhost:8081/img");
  }
}
