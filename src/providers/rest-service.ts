import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Transfer } from 'ionic-native';
import { User } from '../models/user';
import { Idea } from '../models/idea';
import { AlertController } from 'ionic-angular';
// import { Media } from '../models/media';

/*
  Generated class for the RestService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RestService {
  apiUrl = 'https://floating-anchorage-35981.herokuapp.com';
  gridfsUrl = 'https://protected-temple-59341.herokuapp.com';
  constructor(public http: Http, public alertCtrl: AlertController) {
    console.log('Hello RestService Provider');
  }
  // postUser(data: User): Observable<User>{
  postUser(username, email, password): Observable<User>{
    console.log('In postUser');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // return this.http.post('https://floating-anchorage-35981.herokuapp.com/user/create', JSON.stringify(data), {headers: headers})
    // return this.http.post('/user/create', JSON.stringify(data), {headers: headers})
    return this.http.post(`${this.apiUrl}/user/create?username=${username}&password=${password}&email=${email}`, {headers: headers})
      .map(res =><User> res.json());
  }

  getUser(name, password): Observable<User> {
    console.log('In getUser '+ name +' '+password);
    // return this.http.get('https://floating-anchorage-35981.herokuapp.com/user?username='+name+'&password='+password)
    return this.http.get(`${this.apiUrl}/user?username=${name}&password=${password}`)//working
      .map(res => <User>res.json());
  }

  postIdea(description:string, suggestion:string, area:string, username:string, mediaId:string): Observable<Idea>{
    console.log('In IdeaIdea');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // return this.http.post('https://floating-anchorage-35981.herokuapp.com/idea/create', JSON.stringify(data), {headers: headers})
    // return this.http.post('/Idea/create', JSON.stringify(data), {headers: headers})
    return this.http.post(`${this.apiUrl}/idea/create?description=${description}&suggestion=${suggestion}&area=${area}&username=${username}&mediaId=${mediaId}`, {headers: headers})
      .map(res =><Idea> res.json());
  }

postMedia(imageUri): string{
  const fileTransfer = new Transfer();
  var fileId: string;
  var options: any;
  options = {
    fileKey: 'avatar',//'file',
    fileName: imageUri.substr(imageUri.lastIndexOf('/') + 1),
    mimeType: "binary/octet-stream",
    headers: {}
  };
  fileTransfer.upload(imageUri, encodeURI(this.gridfsUrl+"/file/"), options)
    .then((data) => {
      console.log("Successfully upload the image");
      console.log("Code = " + data.responseCode);
      fileId= data.response;
    }, (err) => {
      // error
      // let alert = this.alertCtrl.create({
      //   title: 'Failed to upload',
      //   subTitle: err.code,
      //   buttons: ['Dismiss']
      // });
      // alert.present();
      console.log("Failed to upload file");
      console.log("Code = " + err.code);
      fileId= "\"error\""; //let's make 0 equals to upload failed
    })
    return fileId.replace('\"', '');
}

uploadFile(fileToUpload: any) {
    let input = new FormData();
    input.append("avatar", fileToUpload);

    return this.http
        .post(this.gridfsUrl+"/file/", input);
}

}
