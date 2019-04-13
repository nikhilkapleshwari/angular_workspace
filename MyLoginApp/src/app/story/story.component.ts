import { UploadService } from './../services/upload.service';
import { Component, OnInit } from '@angular/core';
import { Http, ResponseContentType } from '@angular/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DownloadService } from '../services/download.service';
//import 'rxjs/add/operator/map';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent{

  file:File;
  imageData:any;
  fileNameList:Array<string>;
  listData:[any];

  constructor(private uploadService:UploadService,
    private downloadService:DownloadService,private http: Http, 
    private sanitizer: DomSanitizer) {

      const formData=new FormData();
      formData.append("token",localStorage.getItem('token'));
      //formData.append("fileName",fileName);
      const imageUrl = 'http://localhost:8081/getFile';
        this.http.post(imageUrl,formData, {
          responseType: ResponseContentType.Blob
        }).subscribe((res: any) => {
            let blob = new Blob([res._body], {
              type: res.headers.get("Content-Type")
            });
    
            let urlCreator = window.URL;
            this.listData.push(this.sanitizer.bypassSecurityTrustUrl(
                urlCreator.createObjectURL(blob)));
                console.log(this.listData[0]);
          });

      //************************************** */
      // const imageUrl = 'http://localhost:8081/img';
      // this.http.get(imageUrl, {
      //   responseType: ResponseContentType.Blob
      // }).subscribe((res: any) => {
      //     let blob = new Blob([res._body], {
      //       type: res.headers.get("Content-Type")
      //     });
  
      //     let urlCreator = window.URL;
      //     this.imageData = this.sanitizer.bypassSecurityTrustUrl(
      //         urlCreator.createObjectURL(blob));
      //   });
     }


  onFileChanged(event) {
    console.log("File selected");
  this.file=event.target.files[0];
  console.log(this.file);
  }

  onFileUpload(){
    this.uploadService.upload(this.file).subscribe(
      response=>{
        console.log(response);
      }
    );
  }

  onGetFileList(){
   let userToken=localStorage.getItem('token');
    this.downloadService.downloadFileNameList(userToken)
    .subscribe(response=>{
      this.fileNameList=response.json();
      console.log(this.fileNameList);
    });

  }

  onGetFile(){
    const formData=new FormData();
    formData.append("token",localStorage.getItem('token'));
    //formData.append("fileName",fileName);
    const imageUrl = 'http://localhost:8081/getFile';
      this.http.post(imageUrl,formData, {
        responseType: ResponseContentType.Blob
      }).subscribe((res: any) => {
          let blob = new Blob([res._body], {
            type: res.headers.get("Content-Type")
          });
  
          let urlCreator = window.URL;
          this.listData.push(this.sanitizer.bypassSecurityTrustUrl(
              urlCreator.createObjectURL(blob)));
        });
     }




}
