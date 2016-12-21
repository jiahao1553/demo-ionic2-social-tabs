import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
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

  postIdea(ideaOwner:string,
  ideaOwnerNickname: string,
  ideaOwnerAvatar: string,
  description: string,
  mediaId: string,
  mediaType: string,
  area: string,
  status: string,
  likesNo: number,
  suggestionsNo: number,
  latestSuggestionOwner: string,
  latestSuggestionOwnerNickname: string,
  latestSuggestion: string): Observable<Idea> {
    let data = {
      ideaOwner : ideaOwner,
      ideaOwnerNickname : ideaOwnerNickname,
      ideaOwnerAvatar : ideaOwnerAvatar,
      description : description,
      mediaId : mediaId,
      mediaType : mediaType,
      area : area,
      status : status,
      likesNo : likesNo,
      suggestionsNo : suggestionsNo,
      latestSuggestionOwner : latestSuggestionOwner,
      latestSuggestionOwnerNickname : latestSuggestionOwnerNickname,
      latestSuggestion : latestSuggestion,
    };
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.apiUrl+'/idea/', JSON.stringify(data), { headers: headers })
      .map(res => <Idea>res.json());
  }

  getIdea(loadIdeasSkipper: number): Observable<Idea[]> {
    return this.http.get(`${this.apiUrl}/idea?sort=createdAt DESC&limit=5&skip=${loadIdeasSkipper}`)
      .map(res => <Idea[]>res.json());
  }

  uploadFile(fileToUpload: any) {
    let input = new FormData();
    input.append("file", fileToUpload);
    return this.http
      .post(this.gridfsUrl + "/file/", input);
  }

}
