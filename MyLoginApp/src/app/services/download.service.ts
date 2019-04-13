import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  private downloadAllFileLink:string="http://localhost:8081/listOfFiles";

  constructor(private http:Http) { }

  downloadFileNameList(userToken){
    return this.http.post(this.downloadAllFileLink,userToken);
  }

  
}
