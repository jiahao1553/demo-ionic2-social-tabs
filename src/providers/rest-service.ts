import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Transfer } from 'ionic-native';
import { User } from '../models/user';
import { Idea } from '../models/idea';
import { AlertController } from 'ionic-angular';

@Injectable()
export class RestService {
  apiUrl = 'https://floating-anchorage-35981.herokuapp.com';
  gridfsUrl = 'https://protected-temple-59341.herokuapp.com';

  constructor(public http: Http,
    public alertCtrl: AlertController) {
    console.log('Hello RestService Provider');
  }

  postUser(username, email, password): Observable<User> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.apiUrl}/user/create?username=${username}&password=${password}&email=${email}`, { headers: headers })
      .map(res => <User>res.json());
  }

  getUser(name, password): Observable<User> {
    return this.http.get(`${this.apiUrl}/user?username=${name}&password=${password}`)//working
      .map(res => <User>res.json());
  }

  postIdea(description: string, suggestion: string, area: string, username: string, mediaId: string): Observable<Idea> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.apiUrl}/idea/create?description=${description}&suggestion=${suggestion}&area=${area}&username=${username}&mediaId=${mediaId}`, { headers: headers })
      .map(res => <Idea>res.json());
  }

  getIdea(): Observable<Idea[]> {
    return this.http.get(`${this.apiUrl}/idea?sort=createdAt DESC&limit=10`)
      .map(res => <Idea[]>res.json());
  }

  uploadFile(fileToUpload: any) {
    let input = new FormData();
    input.append("file", fileToUpload);
    return this.http
      .post(this.gridfsUrl + "/file/", input);
  }

}
