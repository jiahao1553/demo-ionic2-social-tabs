import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { User } from '../models/user';
import { Idea } from '../models/idea';
import { Suggestion } from '../models/suggestion';
import { Action } from '../models/action';
import { Review } from '../models/review';

@Injectable()
export class RestService {
  authUrl = 'http://10.179.131.25:58385/api';
  apiUrl = 'https://floating-anchorage-35981.herokuapp.com';
  gridfsUrl = 'https://protected-temple-59341.herokuapp.com';

  constructor(public http: Http) {
    console.log('Hello RestService Provider');
  }

  postUser(username: string, fullname: string, avatarId: string, ideaNo: number, actionNo: number): Observable<User> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.apiUrl}/user?username=${username}&fullname=${fullname}&avatarId=${avatarId}&ideaNo=${ideaNo}&actionNo=${actionNo}`, { headers: headers })
      .map(res => <User>res.json());
  }

  authUser(name, password): Observable<boolean> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.authUrl}/user?username=${name}&password=${password}`, { headers: headers })//working
      .map(res => <boolean>res.json());
  }

  searchUser(key: string, value: string): Observable<User[]> {
    return this.http.get(`${this.apiUrl}/user?${key}=${value}&sort=updatedAt DESC`)
      .map(res => <User[]>res.json());
  }

  updateUser(id: string, fullname: string, avatarId: string, ideaNo: number, actionNo: number): Observable<User> {
    let data = {
      fullname: fullname,
      avatarId: avatarId,
      ideaNo: ideaNo,
      actionNo: actionNo
    };
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.apiUrl+'/user/'+id, JSON.stringify(data), { headers: headers })
      .map(res => <User>res.json());
  }

  postIdea(ideaOwner:string,
    ideaOwnerFullname: string,
  ideaOwnerAvatar: string,
  description: string,
  mediaId: string,
  mediaType: string,
  area: string,
  status: string,
  likes: string[],
  likesString: string,
  suggestionsNo: number,
  latestSuggestionOwner: string,
  latestSuggestionOwnerFullname: string,
  latestSuggestion: string): Observable<Idea> {
    let data = {
      ideaOwner : ideaOwner,
      ideaOwnerFullname: ideaOwnerFullname,
      ideaOwnerAvatar : ideaOwnerAvatar,
      description : description,
      mediaId : mediaId,
      mediaType : mediaType,
      area : area,
      status : status,
      likes : likes,
      likesString: likesString,
      suggestionsNo : suggestionsNo,
      latestSuggestionOwner : latestSuggestionOwner,
      latestSuggestionOwnerFullname: latestSuggestionOwnerFullname,
      latestSuggestion : latestSuggestion,
    };
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.apiUrl+'/idea/', JSON.stringify(data), { headers: headers })
      .map(res => <Idea>res.json());
  }

  updateIdea(ideaId:string,
  status: string,
  likes: string[],
  likesString: string,
  suggestionsNo: number,
  latestSuggestionOwner: string,
  latestSuggestionOwnerFullname: string,
  latestSuggestion: string): Observable<Idea> {
    let data = {
      status : status,
      likes : likes,
      likesString: likesString,
      suggestionsNo : suggestionsNo,
      latestSuggestionOwner : latestSuggestionOwner,
      latestSuggestionOwnerFullname: latestSuggestionOwnerFullname,
      latestSuggestion : latestSuggestion,
    };
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.apiUrl+'/idea/'+ideaId, JSON.stringify(data), { headers: headers })
      .map(res => <Idea>res.json());
  }

  getIdea(loadIdeasSkipper: number): Observable<Idea[]> {
    return this.http.get(`${this.apiUrl}/idea?sort=updatedAt DESC&limit=5&skip=${loadIdeasSkipper}`)
      .map(res => <Idea[]>res.json());
  }

  getOneIdea(ideaId: string): Observable<Idea> {
    return this.http.get(`${this.apiUrl}/idea/${ideaId}`)
      .map(res => <Idea>res.json());
  }

  searchIdea(key: string, value: string, area: string, status: string, startDate: string, endDate: string): Observable<Idea[]> {
      return this.http.get(`${this.apiUrl}/idea?where={"${key}":{"contains":"${value}"}, "area":{"contains":"${area}"}, "status":{"contains":"${status}"}, "updatedAt":{">": "${startDate}", "<": "${endDate}"}}`)
        .map(res => <Idea[]>res.json());
  }

  postSuggestion(ideaId: string, suggestionOwner: string, suggestionOwnerFullname: string, suggestion: string): Observable<Suggestion> {
    let data = {
      ideaId: ideaId,
      suggestionOwner: suggestionOwner,
      suggestionOwnerFullname: suggestionOwnerFullname,
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

  deleteSuggestion(ideaId: string): Observable<Suggestion> {
    return this.http.delete(`${this.apiUrl}/suggestion/${ideaId}`)
      .map(res => <Suggestion>res.json());
  }

  searchSuggestion(key: string, value: string, startDate: string, endDate: string): Observable<Suggestion[]> {
    return this.http.get(`${this.apiUrl}/suggestion?where={"${key}":{"contains":"${value}"}, "updatedAt":{">": "${startDate}", "<": "${endDate}"}}`)
      .map(res => <Suggestion[]>res.json());
  }

  postAction(ideaId: string, suggestionId: string, actionOwner: string, actionOwnerFullname: string, action: string, actionDeadline: string): Observable<Action> {
    let data = {
      ideaId: ideaId,
      suggestionId: suggestionId,
      actionOwner: actionOwner,
      actionOwnerFullname: actionOwnerFullname,
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

  deleteAction(actionId: string): Observable<Action> {
    return this.http.delete(`${this.apiUrl}/action/${actionId}`)
      .map(res => <Action>res.json());
  }

  searchAction(key: string, value: string, startDate: string, endDate: string): Observable<Action[]> {
    return this.http.get(`${this.apiUrl}/action?where={"${key}":{"contains":"${value}"}, "actionDeadline":{">": "${startDate}", "<": "${endDate}"}}`)
      .map(res => <Action[]>res.json());
  }

  uploadFile(fileToUpload: any) {
    let input = new FormData();
    input.append("file", fileToUpload);
    return this.http
      .post(this.gridfsUrl + "/file/", input);
  }

  postReview(review: Review): Observable<Review> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.apiUrl+'/review/', JSON.stringify(review), { headers: headers })
      .map(res => <Review>res.json());
  }

}
