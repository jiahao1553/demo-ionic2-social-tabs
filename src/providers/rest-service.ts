import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { User } from '../models/user';
import { Idea } from '../models/idea';
// import { Media } from '../models/media';

/*
  Generated class for the RestService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RestService {
  apiUrl = 'https://floating-anchorage-35981.herokuapp.com';
  constructor(public http: Http) {
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

  postIdea(description, suggestion, area, username, base64image): Observable<Idea>{
    console.log('In IdeaIdea');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // return this.http.post('https://floating-anchorage-35981.herokuapp.com/idea/create', JSON.stringify(data), {headers: headers})
    // return this.http.post('/Idea/create', JSON.stringify(data), {headers: headers})
    return this.http.post(`${this.apiUrl}/idea/create?description=${description}&suggestion=${suggestion}&area=${area}&username=${username}&based64image=${base64image}`, {headers: headers})
      .map(res =><Idea> res.json());
  }

  // postMedia(postid, base64image): Observable<Media>{
  //   console.log('In postMedia');
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   // return this.http.post('https://floating-anchorage-35981.herokuapp.com/post/create', JSON.stringify(data), {headers: headers})
  //   // return this.http.post('/post/create', JSON.stringify(data), {headers: headers})
  //   return this.http.post(`${this.apiUrl}/media/create?postid=${postid}&base64image=${base64image}`, {headers: headers})
  //     .map(res =><Media> res.json());
  // }
}
