import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { User } from '../models/user';
import { Idea } from '../models/idea';
import { Suggestion } from '../models/suggestion';
import { Action } from '../models/action';
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

  searchUser(key: string, value: string): Observable<User[]> {
    return this.http.get(`${this.apiUrl}/user?${key}=${value}`)
      .map(res => <User[]>res.json());
  }

  updateUser(id: string, nickname: string, avatarId: string): Observable<User> {
    let data = {
      nickname: nickname,
      avatarId: avatarId,
    };
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.apiUrl+'/user/'+id, JSON.stringify(data), { headers: headers })
      .map(res => <User>res.json());
  }

  postIdea(ideaOwner:string,
  ideaOwnerAvatar: string,
  description: string,
  mediaId: string,
  mediaType: string,
  area: string,
  status: string,
  likesNo: number,
  suggestionsNo: number,
  latestSuggestionOwner: string,
  latestSuggestion: string): Observable<Idea> {
    let data = {
      ideaOwner : ideaOwner,
      ideaOwnerAvatar : ideaOwnerAvatar,
      description : description,
      mediaId : mediaId,
      mediaType : mediaType,
      area : area,
      status : status,
      likesNo : likesNo,
      suggestionsNo : suggestionsNo,
      latestSuggestionOwner : latestSuggestionOwner,
      latestSuggestion : latestSuggestion,
    };
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.apiUrl+'/idea/', JSON.stringify(data), { headers: headers })
      .map(res => <Idea>res.json());
  }

  getIdea(loadIdeasSkipper: number): Observable<Idea[]> {
    return this.http.get(`${this.apiUrl}/idea?sort=updatedAt DESC&limit=5&skip=${loadIdeasSkipper}`)
      .map(res => <Idea[]>res.json());
  }

  postSuggestion(ideaId: string, suggestionOwner: string, suggestion: string): Observable<Suggestion> {
    let data = {
      ideaId: ideaId,
      suggestionOwner: suggestionOwner,
      suggestion: suggestion
    };
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.apiUrl+'/suggestion/', JSON.stringify(data), { headers: headers })
      .map(res => <Suggestion>res.json());
  }

  getSuggestion(ideaId: string): Observable<Suggestion[]> {
    return this.http.get(`${this.apiUrl}/suggestion?ideaId=${ideaId}&sort=updatedAt ASC`)
      .map(res => <Suggestion[]>res.json());
  }

  postAction(ideaId: string, suggestionId: string, actionOwner: string, action: string, actionDeadline: string): Observable<Action> {
    let data = {
      ideaId: ideaId,
      suggestionId: suggestionId,
      actionOwner: actionOwner,
      action: action,
      actionDeadline: actionDeadline
    };
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.apiUrl+'/action/', JSON.stringify(data), { headers: headers })
      .map(res => <Action>res.json());
  }

  getAction(suggestionId: string): Observable<Action[]> {
    return this.http.get(`${this.apiUrl}/action?suggestionId=${suggestionId}&sort=updatedAt ASC`)
      .map(res => <Action[]>res.json());
  }

  uploadFile(fileToUpload: any) {
    let input = new FormData();
    input.append("file", fileToUpload);
    return this.http
      .post(this.gridfsUrl + "/file/", input);
  }

}
